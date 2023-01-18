import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import ShowsList from "../components/ShowsList";
import CurrentlyWatching from "../components/CurrentlyWatching";
import useShows from "../hooks/useShows";

const ProfilePage = () => {
	const { user } = useAuth();
	const favoritesIds = useFavoritesIds(user?.uid);
	const favoriteShows = useShows(favoritesIds);

	return (
		<main className="max-w-md px-5 sm:px-0 sm:container mx-auto">
			<h1 className="text-center font-bold text-3xl sm:text-4xl flex flex-col sm:block">
				<span className="font-semibold">Welcome</span>{" "}
				<span className="text-accent text-[1.5rem] sm:text-3xl md:text-4xl">
					{user?.email}
				</span>
			</h1>

			<h2 className="text-center font-bold text-2xl sm:text-3xl mt-10">
				Your favorite shows
			</h2>
			<ShowsList shows={favoriteShows} />

			<CurrentlyWatching />
		</main>
	);
};

const useFavoritesIds = (userId?: string) => {
	const [favoritesIds, setFavoritesIds] = useState<number[]>([]);

	useEffect(() => {
		const favoritesRef = ref(database, `users/${userId}/favorites`);
		onValue(favoritesRef, (snapshot) => {
			const data = snapshot.val();
			const favorites: number[] = data ? Object.values(data) : [];
			setFavoritesIds(favorites);
			/* If I don't close the connection, it removes the favorites
      from the list immediatly. I want them to be removed on refresh */
			off(favoritesRef);
		});
	}, [userId]);

	return favoritesIds;
};

export default ProfilePage;
