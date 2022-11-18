import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	UserCredential,
	User,
} from "firebase/auth";
import { auth } from "../firebase";

interface PropTypes {
	children: JSX.Element;
}

interface ContextTypes {
	user: User | null;
	signInUser: (email: string, password: string) => Promise<UserCredential>;
	createUser: (email: string, password: string) => Promise<UserCredential>;
	signOutUser: () => Promise<void>;
}

const UserContext = createContext<ContextTypes>({
	user: null,
	signInUser: async () => {
		return {} as UserCredential;
	},
	createUser: async () => {
		return {} as UserCredential;
	},
	signOutUser: async () => {},
});

export const AuthContextProvider = ({ children }: PropTypes) => {
	const [user, setUser] = useState<User | null>(null);

	const signInUser = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const createUser = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signOutUser = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setUser(user);
		});

		return () => unsubscribe();
	}, []);

	return (
		<UserContext.Provider
			value={{ user, signInUser, createUser, signOutUser }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(UserContext);
};
