import Navbar from "../components/Navbar";
import ShowsList from "../components/ShowsList";
import useFavorites from "../hooks/useFavorites";
import useFavoriteShows from "../hooks/useFavoriteShows";

const ProfilePage = () => {
	const favoritesIds = useFavorites();
	const favoriteShows = useFavoriteShows({ favoritesIds });

	return (
		<>
			<Navbar />
			<main className="max-w-md px-5 sm:px-0 sm:container mx-auto">
				<ShowsList shows={favoriteShows} />
			</main>
		</>
	);
};

export default ProfilePage;
