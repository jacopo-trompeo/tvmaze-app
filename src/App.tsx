import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import ShowDetailPage from "./pages/ShowDetailPage";
import ProfilePage from "./pages/ProfilePage";
import RankingPage from "./pages/RankingPage";
import Navbar from "./components/Navbar";
import CurrentlyWatching from "./components/CurrentlyWatching";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

type WrapperProps = {
	children: JSX.Element;
	isAuth: boolean;
};

const renderPage = (
	Page: () => JSX.Element,
	Wrapper: ({ children, isAuth }: WrapperProps) => JSX.Element,
	isAuth: boolean
) => {
	return (
		<Wrapper isAuth={isAuth}>
			<>
				{!isAuth && <Navbar />}
				<Page />
				{!isAuth && <CurrentlyWatching />}
			</>
		</Wrapper>
	);
};

const router = createBrowserRouter([
	{
		path: "/login",
		element: renderPage(LoginPage, ProtectedRoute, true),
	},
	{
		path: "/signup",
		element: renderPage(SignupPage, ProtectedRoute, true),
	},
	{
		path: "/",
		element: renderPage(SearchPage, ProtectedRoute, false),
	},
	{
		path: "/show/:id",
		element: renderPage(ShowDetailPage, ProtectedRoute, false),
	},
	{
		path: "/profile",
		element: renderPage(ProfilePage, ProtectedRoute, false),
	},
	{
		path: "/ranking",
		element: renderPage(RankingPage, ProtectedRoute, false),
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
]);

function App() {
	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	);
}

export default App;
