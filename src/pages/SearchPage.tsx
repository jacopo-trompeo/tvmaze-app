import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SearchPage = () => {
	const { user, logOut } = useAuth();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			await logOut();
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{user && user.email}
			<br />
			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	);
};

export default SearchPage;
