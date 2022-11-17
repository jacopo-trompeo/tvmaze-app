import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
	},
	{
		path: "/search",
		element: <SearchPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
