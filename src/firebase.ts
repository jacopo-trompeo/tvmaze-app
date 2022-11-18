import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const config = {
	firebaseConfig: {
		apiKey: "AIzaSyCB8DuhhUcOWGoSNZepRWTm9nB_W_OdQ7Y",
		authDomain: "tvmaze-app.firebaseapp.com",
		databaseURL:
			"https://tvmaze-app-default-rtdb.europe-west1.firebasedatabase.app",
		projectId: "tvmaze-app",
		storageBucket: "tvmaze-app.appspot.com",
		messagingSenderId: "871964677799",
		appId: "1:871964677799:web:f0f26f4069573fad57ad82",
	},
};

const app = initializeApp(config.firebaseConfig);
export const auth = getAuth(app);
export default app;
