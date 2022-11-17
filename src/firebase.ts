import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCB8DuhhUcOWGoSNZepRWTm9nB_W_OdQ7Y",
	authDomain: "tvmaze-app.firebaseapp.com",
	databaseURL:
		"https://tvmaze-app-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "tvmaze-app",
	storageBucket: "tvmaze-app.appspot.com",
	messagingSenderId: "871964677799",
	appId: "1:871964677799:web:f0f26f4069573fad57ad82",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUser = async (email: string, password: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential;
	} catch (error) {
		return error;
	}
};

export const signInUser = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential;
	} catch (error) {
		return error;
	}
};
