import Navbar from "../components/Navbar";
import ShowsList from "../components/ShowsList";
import { useAuth } from "../context/AuthContext";
import useFavorites from "../hooks/useFavorites";
import useFavoriteShows from "../hooks/useFavoriteShows";

const ProfilePage = () => {
	const { user } = useAuth();
	const favoritesIds = useFavorites();
	const favoriteShows = useFavoriteShows({ favoritesIds });

	return (
		<>
			<Navbar />
			<main className="max-w-md px-5 sm:px-0 sm:container mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 sm:max-w-4xl mx-auto">
					<div>
						<img
							src="https://placeimg.com/200/200/people"
							alt="Your profile image"
							className="rounded-md w-50 h-50 mx-auto"
						/>
					</div>
					<div className="text-center mt-10 sm:mt-0">
						<h1 className="sm:mt-10 text-2xl font-bold">
							{user?.email}
						</h1>

						<div className="flex mt-10 sm:mt-20 justify-center">
							<button className="btn btn-sm btn-outline">
								Change image
							</button>
						</div>
					</div>
				</div>

				<div className="divider my-10" />

				<h1 className="text-center font-bold text-3xl sm:text-4xl">
					Your favorite shows
				</h1>
				<ShowsList shows={favoriteShows} />
			</main>
		</>
	);
};

export default ProfilePage;
