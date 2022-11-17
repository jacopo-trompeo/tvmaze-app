import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
