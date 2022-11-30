import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";

const useIsFavorite = (id?: string | number) => {
	const { user } = useAuth();
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (!user) {
			return;
		}

		onValue(
			ref(database, `users/${user.uid}/favorites/${id}`),
			snapshot => {
				const data = snapshot.val();
				if (data) {
					setIsFavorite(true);
				}
			}
		);
	}, [user]);

	return isFavorite;
};

export default useIsFavorite;
