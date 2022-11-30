import Navbar from "../components/Navbar";
import useFavorites from "../hooks/useFavorites";

const ProfilePage = () => {
	const favorites = useFavorites();

	return (
		<>
			<Navbar />
		</>
	);
};

export default ProfilePage;
