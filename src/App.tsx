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
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/login",
		element: (
			<ProtectedRoute isAuth={true}>
				<LoginPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/signup",
		element: (
			<ProtectedRoute isAuth={true}>
				<SignupPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<SearchPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/show/:id",
		element: (
			<ProtectedRoute>
				<ShowDetailPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/profile",
		element: (
			<ProtectedRoute>
				<ProfilePage />
			</ProtectedRoute>
		),
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
