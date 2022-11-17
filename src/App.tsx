import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import AuthProvider from "./components/AuthProvider";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";

initializeApp(config.firebaseConfig);

const router = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/",
		element: (
			<AuthProvider>
				<SearchPage />
			</AuthProvider>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
