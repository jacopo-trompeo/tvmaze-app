import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";

const useIsFavorite = (id?: string | number) => {
	const { user } = useAuth();
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	useEffect(() => {
		if (!user) {
			return;
		}

		const unsubscribe = onValue(
			ref(database, `users/${user.uid}/favorites/${id}`),
			snapshot => {
				const data = snapshot.val();
				setIsFavorite(!!data);
			}
		);

		return () => {
			unsubscribe();
		};
	}, [user]);

	return isFavorite;
};

export default useIsFavorite;
