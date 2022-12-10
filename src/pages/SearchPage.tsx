import { useEffect, useState } from "react";
import { ShowType, getShowsBySearch } from "../api";
import ShowsList from "../components/ShowsList";
import Navbar from "../components/Navbar";
import SearchIcon from "../components/icons/SearchIcon";
import { useSearchParams } from "react-router-dom";
import CurrentlyWatching from "../components/CurrentlyWatching";

const SearchPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchQueryUrl, setSearchQueryUrl] = useSearchParams("");
	const [shows, setShows] = useState<ShowType[]>([]);
	const [emptyResult, setEmptyResult] = useState(false);
	const [loading, setLoading] = useState(false);

	const getShows = async () => {
		setEmptyResult(false);

		if (!searchQueryUrl.get("query")) {
			setShows([]);
			return;
		}

		setLoading(true);

		const shows = await getShowsBySearch(
			searchQueryUrl.get("query") as string
		);

		if (shows.length === 0) {
			setEmptyResult(true);
		}

		setShows(shows);
		setLoading(false);
	};

	useEffect(() => {
		getShows();
	}, [searchQueryUrl]);

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (searchQuery === searchQueryUrl.get("query")) {
			return;
		}

		setShows([]);
		setSearchQueryUrl({ query: searchQuery });
	};

	return (
		<>
			<Navbar />
			<main className="max-w-md px-5 sm:px-0 sm:container mx-auto">
				<h1 className="text-center font-bold text-3xl sm:text-4xl">
					Search for a show
				</h1>

				<form className="mt-10" onSubmit={handleSearch}>
					<div className="relative">
						<input
							type="text"
							placeholder="Search by name..."
							className="input input-bordered input-accent w-full"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
						<button className="absolute right-5 top-3">
							<SearchIcon />
						</button>
					</div>
				</form>

				{loading ? (
					<div className="animate-spin rounded-full h-32 w-32 mx-auto border-b-4 border-white mt-40" />
				) : emptyResult ? (
					<p className="text-xl font-semibold text-center mt-10">
						Your search for{" "}
						<span className="italic font-bold">
							"{searchQueryUrl.get("query")}"
						</span>{" "}
						yielded no results.
					</p>
				) : (
					<ShowsList shows={shows}></ShowsList>
				)}

				<CurrentlyWatching />
			</main>
		</>
	);
};

export default SearchPage;
