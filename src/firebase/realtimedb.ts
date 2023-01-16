import { User } from "firebase/auth";
import { ref, remove, set, update } from "firebase/database";
import { database } from ".";

type UserType = User | null | undefined;

export const addToFavorites = (showId: number, user: UserType) => {
	update(ref(database, `users/${user?.uid}/favorites`), {
		[showId]: showId,
	});
};

export const removeFromFavorites = (showId: number, user: UserType) => {
	remove(ref(database, `users/${user?.uid}/favorites/${showId}`));
};

export const addToWatching = (showId: number, user: UserType) => {
	set(ref(database, `users/${user?.uid}`), {
		watching: showId,
	});
};

export const removeFromWatching = (user: UserType) => {
	remove(ref(database, `users/${user?.uid}/watching`));
};
