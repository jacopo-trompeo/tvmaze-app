import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { getShowById, ShowDetailType } from "../api";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import Navbar from "../components/Navbar";
import ShowsList from "../components/ShowsList";

const ProfilePage = () => {
	const { user } = useAuth();
	const favoritesIds = useFavorites();
	const favoriteShows = useShows(favoritesIds);

	return (
		<>
			<Navbar />
			<main className="max-w-md px-5 sm:px-0 sm:container mx-auto">
				<h1 className="text-center font-bold text-3xl sm:text-4xl">
					<span className="font-semibold">Welcome</span>{" "}
					<span className="text-accent">{user?.email}</span>
				</h1>

				<h2 className="text-center font-bold text-2xl sm:text-3xl mt-10">
					Your favorite shows
				</h2>
				<ShowsList shows={favoriteShows} />
			</main>
		</>
	);
};

const useFavorites = () => {
	const [favorites, setFavorites] = useState<number[]>([]);
	const { user } = useAuth();

	useEffect(() => {
		const favoritesRef = ref(database, `users/${user?.uid}/favorites`);
		onValue(favoritesRef, (snapshot) => {
			const data = snapshot.val();
			const favorites: number[] = data ? Object.values(data) : [];
			setFavorites(favorites);
			/* If I don't close the connection, it removes the favorites
      from the list immediatly. I want them to be removed on refresh */
			off(favoritesRef);
		});
	}, [user]);

	return favorites;
};

const useShows = (showsIds: number[]) => {
	const [shows, setShows] = useState<ShowDetailType[]>([]);

	useEffect(() => {
		const fetchShows = async () => {
			const showsRes = await Promise.all(
				showsIds.map((id) => getShowById(id))
			);
			setShows(showsRes);
		};
		fetchShows();
	}, [showsIds]);

	return shows;
};

export default ProfilePage;
