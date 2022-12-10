import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	UserCredential,
	User,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

interface PropTypes {
	children: JSX.Element;
}

interface ContextTypes {
	/* user has undefined type as well, which indicates that its loading the data */
	user: User | undefined | null;
	createUser: (email: string, password: string) => Promise<UserCredential>;
	logIn: (email: string, password: string) => Promise<UserCredential>;
	logInWithGoogle: () => void;
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
	logInWithGoogle: async () => {
		return {} as UserCredential;
	},
	logOut: async () => {},
});

export const AuthContextProvider = ({ children }: PropTypes) => {
	const [user, setUser] = useState<User | undefined | null>(undefined);

	/* I'm setting the user to undefined everytime the user tries to 
  log in or sign up so that the protected route component knows to render
  the loading component while the user is being fetched from firebase */
	const createUser = (email: string, password: string) => {
		setUser(undefined);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const logIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		onAuthStateChanged(auth, (currUser) => {
			console.log(currUser);
			setUser(currUser);
		});
	}, []);

	return (
		<UserContext.Provider
			value={{ user, createUser, logIn, logInWithGoogle, logOut }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(UserContext);
};
