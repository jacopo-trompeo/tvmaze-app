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
	createUser: (email: string, password: string) => Promise<UserCredential>;
	logIn: (email: string, password: string) => Promise<UserCredential>;
	logOut: () => Promise<void>;
}

const UserContext = createContext<ContextTypes>({
	user: undefined,
	createUser: async () => {
		return {} as UserCredential;
	},
	logIn: async () => {
		return {} as UserCredential;
	},
	logOut: async () => {},
});

export const AuthContextProvider = ({ children }: PropTypes) => {
	const [user, setUser] = useState<User | undefined | null>(undefined);

	const createUser = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const logIn = (email: string, password: string) => {
		setUser(undefined);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			setUser(user);
		});
	}, []);

	return (
		<UserContext.Provider value={{ user, createUser, logIn, logOut }}>
			{children}
		</UserContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(UserContext);
};
