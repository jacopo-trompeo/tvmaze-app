// custom hook that gets the users favorite shows from realtime database
import { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useAuth } from "../context/AuthContext";

export default () => {
	const [favorites, setFavorites] = useState<string[]>([]);
	const { user } = useAuth();

	useEffect(() => {
		const favoritesRef = ref(database, `users/${user?.uid}/favorites`);
		onValue(favoritesRef, snapshot => {
			const data = snapshot.val();
			const favorites = data ? Object.keys(data) : [];
			setFavorites(favorites);
		});
	}, [user]);

	return favorites;
};
