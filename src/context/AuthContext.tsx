import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

interface PropTypes {
	children: JSX.Element;
}

interface ContextTypes {
	user: User | null;
	createUser: (email: string, password: string) => Promise<void>;
	logIn: (email: string, password: string) => Promise<void>;
	logInWithGoogle: () => void;
	logOut: () => void;
}

const UserContext = createContext<ContextTypes>({
	user: null,
	createUser: async () => {},
	logIn: async () => {},
	logInWithGoogle: async () => {},
	logOut: () => {},
});

export const AuthContextProvider = ({ children }: PropTypes) => {
	const [user, setUser] = useState<User | null>(null);

	const mapErrorMessage = (code: string) => {
		const errorMessages: { [key: string]: string } = {
			"auth/wrong-password": "Wrong password",
			"auth/user-not-found": "User not found",
			"auth/too-many-requests": "Too many requests",
			"auth/email-already-in-use": "Email already in use",
			"auth/popup-closed-by-user": "Popup closed by user",
		};

		return errorMessages[code] || "Something went wrong";
	};

	const createUser = async (email: string, password: string) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err: any) {
			/* need to set the user to null, because onauthstatechanged doesn not trigger on error */
			setUser(null);
			throw mapErrorMessage(err.code);
		}
	};

	const logIn = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err: any) {
			setUser(null);
			throw mapErrorMessage(err.code);
		}
	};

	const logInWithGoogle = () => {
		const provider = new GoogleAuthProvider();

		try {
			signInWithPopup(auth, provider);
		} catch (err: any) {
			setUser(null);
			throw mapErrorMessage(err.code);
		}
	};

	const logOut = () => {
		signOut(auth);
	};

	useEffect(() => {
		onAuthStateChanged(auth, currUser => {
			setUser(currUser);
		});
	}, []);

	return (
		<UserContext.Provider
			value={{
				user,
				createUser,
				logIn,
				logInWithGoogle,
				logOut,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(UserContext);
};
