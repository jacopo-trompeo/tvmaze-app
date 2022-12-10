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
	/* user has undefined type as well, which indicates that its loading the data */
	user: User | undefined | null;
	createUser: (email: string, password: string) => Promise<void>;
	logIn: (email: string, password: string) => Promise<void>;
	logInWithGoogle: () => void;
	logOut: () => Promise<void>;
	authError: string;
}

const UserContext = createContext<ContextTypes>({
	user: undefined,
	createUser: async () => {},
	logIn: async () => {},
	logInWithGoogle: async () => {},
	logOut: async () => {},
	authError: "",
});

export const AuthContextProvider = ({ children }: PropTypes) => {
	const [user, setUser] = useState<User | undefined | null>(undefined);
	const [authError, setAuthError] = useState("");

	const updateErrorMessage = (code: string) => {
		switch (code) {
			case "auth/wrong-password":
				setAuthError("Wrong password");
				break;
			case "auth/user-not-found":
				setAuthError("User not found");
				break;
			case "auth/too-many-requests":
				setAuthError("Too many requests");
				break;
			case "auth/email-already-in-use":
				setAuthError("Email already in use");
				break;
			default:
				setAuthError("Something went wrong");
		}
	};

	/* I'm setting the user to undefined everytime the user tries to 
  log in or sign up so that the protected route component knows to render
  the loading component while the user is being fetched from firebase */
	const createUser = async (email: string, password: string) => {
		setUser(undefined);

		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err: any) {
			/* need to set the user to null, because onauthstatechanged doesn not trigger on error */
			setUser(null);
			updateErrorMessage(err.code);
		}
	};

	const logIn = async (email: string, password: string) => {
		setUser(undefined);

		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err: any) {
			setUser(null);
			updateErrorMessage(err.code);
		}
	};

	const logInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		setUser(undefined);

		try {
			signInWithPopup(auth, provider);
		} catch (err: any) {
			setUser(null);
			updateErrorMessage(err.code);
		}
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		onAuthStateChanged(auth, currUser => {
			setAuthError("");
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
				authError,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(UserContext);
};
