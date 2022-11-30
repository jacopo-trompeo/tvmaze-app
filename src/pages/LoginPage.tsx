import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "../components/icons/CloseIcon";
import GoogleIcon from "../components/icons/GoogleIcon";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { logIn, logInWithGoogle } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}

		try {
			await logIn(email, password);
			navigate("/");
		} catch (error: any) {
			if (error.code === "auth/user-not-found") {
				setError("Incorrect credentials");
			}
		}
	};

	const handleGoogleLogin = async () => {
		try {
			await logInWithGoogle();
			navigate("/");
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<main className="flex flex-col justify-center items-center h-screen bg-gray-100 px-10">
			<h2 className="text-center text-4xl font-extrabold text-gray-900">
				Sign in to TVMaze App
			</h2>
			<p className="mt-4 text-center text-sm text-gray-600">
				Don't have an account?{" "}
				<Link
					to="/signup"
					className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:border-b focus:border-indigo-500"
				>
					Sign up here.
				</Link>
			</p>

			<div className="mt-8 w-full max-w-md mx-auto bg-white shadow-md rounded-lg py-10 px-6">
				{error && (
					<div className="flex mb-5 w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-pink-700">
						<p>{error}</p>
						<button
							className="ml-auto cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-white"
							onClick={() => setError("")}
						>
							<CloseIcon />
						</button>
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="flex flex-col py-2">
						<label
							htmlFor="email"
							className="mb-1 text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						/>
					</div>
					<div className="flex flex-col py-2">
						<label
							htmlFor="password"
							className="mb-1 text-sm font-medium text-gray-700 "
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						/>
					</div>

					<button
						type="submit"
						className="mt-5 w-full py-3 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
					>
						Log In
					</button>

					<p className="text-center font-medium my-3">or</p>

					<button
						type="button"
						className="flex justify-center items-center w-full py-3 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
						onClick={handleGoogleLogin}
					>
						<GoogleIcon />
						Sign in with Google
					</button>
				</form>
			</div>
		</main>
	);
};

export default LoginPage;
