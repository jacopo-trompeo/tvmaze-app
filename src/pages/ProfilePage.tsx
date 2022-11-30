import Navbar from "../components/Navbar";
import ShowsList from "../components/ShowsList";
import { useAuth } from "../context/AuthContext";
import useFavorites from "../hooks/useFavorites";
import useShows from "../hooks/useShows";

const ProfilePage = () => {
	const { user } = useAuth();
	const favoritesIds = useFavorites();
	const favoriteShows = useShows({ showsIds: favoritesIds });

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

export default ProfilePage;
