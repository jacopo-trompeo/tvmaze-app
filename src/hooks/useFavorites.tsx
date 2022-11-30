// custom hook that gets the users favorite shows from realtime database
import { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useAuth } from "../context/AuthContext";

const useFavorites = () => {
	const [favorites, setFavorites] = useState<number[]>([]);
	const { user } = useAuth();

	useEffect(() => {
		const favoritesRef = ref(database, `users/${user?.uid}/favorites`);
		onValue(favoritesRef, snapshot => {
			const data = snapshot.val();
			const favorites: number[] = data ? Object.values(data) : [];
			setFavorites(favorites);
		});
	}, [user]);

	return favorites;
};

export default useFavorites;
