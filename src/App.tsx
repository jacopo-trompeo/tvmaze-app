import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import ShowDetailPage from "./pages/ShowDetailPage";
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
]);

function App() {
	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	);
}

export default App;
