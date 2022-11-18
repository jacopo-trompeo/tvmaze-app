import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import AuthProvider from "./components/AuthProvider";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";

initializeApp(config.firebaseConfig);

/*const renderPage = (
	component: any,
	Wrapper: any,
	options?: { auth: boolean }
) => {
	if (!!Wrapper) {
		return <Wrapper {...options}>{component}</Wrapper>;
	} else {
		return component;
	}
};*/

const router = createBrowserRouter([
	{
		path: "/login",
		element: (
			<AuthProvider options={{ auth: true }}>
				<LoginPage />
			</AuthProvider>
		),
	},
	{
		path: "/",
		element: (
			<AuthProvider options={{ auth: false }}>
				<SearchPage />
			</AuthProvider>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
