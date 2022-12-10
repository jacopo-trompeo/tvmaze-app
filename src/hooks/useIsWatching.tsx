import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";

const useIsWatching = (id?: string | number) => {
	const { user } = useAuth();
	const [isWatching, setIsWatching] = useState<boolean>(false);

	useEffect(() => {
		if (!user) {
			return;
		}

		const unsubscribe = onValue(
			ref(database, `users/${user.uid}/watching/`),
			snapshot => {
				const data = snapshot.val();
				const idNum = parseInt(id as string);

				if (!data) {
					setIsWatching(false);
					return;
				}

				setIsWatching(data.showId === idNum);
			}
		);

		return () => {
			unsubscribe();
		};
	}, [user]);

	return isWatching;
};

export default useIsWatching;
