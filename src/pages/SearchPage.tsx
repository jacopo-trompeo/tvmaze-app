import { useEffect, useState } from "react";
import { ShowType, getShowsBySearch } from "../api";
import { useAuth } from "../context/AuthContext";
import { ref, update, onValue, remove } from "firebase/database";
import { database } from "../firebase";
import ShowsList from "../components/ShowsList";

const SearchPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [shows, setShows] = useState<ShowType[]>([]);
	const [favorites, setFavorites] = useState<number[]>([]);
	const { user } = useAuth();

	useEffect(() => {
		const favoritesRef = ref(database, `users/${user?.uid}/favorites`);
		onValue(favoritesRef, snapshot => {
			const data = snapshot.val();
			if (!data) {
				return;
			}

			setFavorites(Object.values(data));
		});
	}, [user]);

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const shows = await getShowsBySearch(searchQuery);
		setShows(shows);
	};

	const addToFavorites = (showId: number) => {
		update(ref(database, `users/${user?.uid}/favorites`), {
			[showId]: showId,
		});
	};

	const removeFromFavorites = (showId: number) => {
		remove(ref(database, `users/${user?.uid}/favorites/${showId}`));
		setFavorites(favorites.filter(id => id !== showId));
	};

	return (
		<main className="max-w-md px-5 sm:px-0 sm:container mx-auto">
			<h1 className="text-center font-bold text-3xl sm:text-4xl mt-5">
				Search for a show
			</h1>

			<form className="mt-10 mb-8" onSubmit={handleSearch}>
				<div className="relative">
					<input
						type="text"
						placeholder="Search by name..."
						className="input input-bordered input-accent w-full"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>
					<button className="absolute right-5 top-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</button>
				</div>
			</form>

			<ShowsList
				shows={shows}
				favorites={favorites}
				addToFavorites={addToFavorites}
				removeFromFavorites={removeFromFavorites}
			></ShowsList>
		</main>
	);
};

export default SearchPage;
