import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { ShowType, getShowById } from "../api";
import Navbar from "../components/Navbar";
import ShowsList from "../components/ShowsList";

const ProfilePage = () => {
	const { user } = useAuth();
	const [favorites, setFavorites] = useState<number[]>([]);
	const [favoriteShows, setFavoriteShows] = useState<ShowType[]>([]);

	useEffect(() => {
		const favoritesRef = ref(database, `users/${user?.uid}/favorites`);
		onValue(favoritesRef, (snapshot) => {
			const data = snapshot.val();
			if (!data) {
				return;
			}

			setFavorites(Object.values(data));
			getFavoriteShows(Object.values(data));
		});
	}, [user]);

	const getFavoriteShows = (favorites: number[]) => {
		const promises = favorites.map((id) => getShowById(id));
		Promise.all(promises).then((shows) => {
			setFavoriteShows(shows);
		});

		setFavoriteShows(favoriteShows);
	};

	return (
		<>
			<Navbar />
			<main className="max-w-md px-5 sm:px-0 sm:container mx-auto">
				<ShowsList
					shows={favoriteShows}
					favorites={favorites}
					addToFavorites={() => {}}
					removeFromFavorites={() => {}}
				/>
			</main>
		</>
	);
};

export default ProfilePage;
