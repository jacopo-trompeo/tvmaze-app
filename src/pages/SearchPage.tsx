import { useEffect, useState } from "react";
import { ShowType, getShowsBySearch } from "../api";
import ShowsList from "../components/ShowsList";
import Navbar from "../components/Navbar";
import SearchIcon from "../components/icons/SearchIcon";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchQueryUrl, setSearchQueryUrl] = useSearchParams("");
	const [shows, setShows] = useState<ShowType[]>([]);
	const [emptyResult, setEmptyResult] = useState(false);

	useEffect(() => {
		const getShows = async () => {
			setEmptyResult(false);

			if (!searchQueryUrl.get("query")) {
				return;
			}

			const shows = await getShowsBySearch(
				searchQueryUrl.get("query") as string
			);

			if (shows.length === 0) {
				setEmptyResult(true);
			}

			setShows(shows);
		};

		getShows();
	}, [searchQueryUrl]);

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button className="absolute right-5 top-3">
							<SearchIcon />
						</button>
					</div>
				</form>

				{!emptyResult ? (
					<ShowsList shows={shows}></ShowsList>
				) : (
					<p className="text-xl font-semibold text-center mt-10">
						Your search for{" "}
						<span className="italic font-bold">
							"{searchQueryUrl.get("query")}"
						</span>{" "}
						yielded no results.
					</p>
				)}
			</main>
		</>
	);
};

export default SearchPage;
