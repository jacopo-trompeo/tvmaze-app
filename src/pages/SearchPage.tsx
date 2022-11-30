import { useState } from "react";
import { ShowType, getShowsBySearch } from "../api";
import ShowsList from "../components/ShowsList";
import Navbar from "../components/Navbar";
import SearchIcon from "../components/icons/SearchIcon";

const SearchPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [shows, setShows] = useState<ShowType[]>([]);

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const shows = await getShowsBySearch(searchQuery);
		setShows(shows);
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

				<ShowsList shows={shows}></ShowsList>
			</main>
		</>
	);
};

export default SearchPage;
