import { getAuth, signOut } from "firebase/auth";

const SearchPage = () => {
	const handleLogOut = () => {
		const auth = getAuth();
		signOut(auth).catch((error) => {
			console.log(error);
		});
	};

	return <button onClick={handleLogOut}>Log out</button>;
};

export default SearchPage;
