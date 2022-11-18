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
	user: User | undefined | null;
	signInUser: (email: string, password: string) => Promise<UserCredential>;
	createUser: (email: string, password: string) => Promise<UserCredential>;
	signOutUser: () => Promise<void>;
}

const UserContext = createContext<ContextTypes>({
	user: undefined,
	signInUser: async () => {
		return {} as UserCredential;
	},
	createUser: async () => {
		return {} as UserCredential;
	},
	signOutUser: async () => {},
});

export const AuthContextProvider = ({ children }: PropTypes) => {
	const [user, setUser] = useState<User | undefined | null>(undefined);

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
		onAuthStateChanged(auth, user => {
			setUser(user);
			console.log(user);
		});
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
