import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import ThemeSwitcher from "../components/ThemeSwitcher";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { createUser } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		if (!email || !password || !confirmPassword) {
			setError("Please fill in all fields");
			setLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			setError("");
			await createUser(email, password);
		} catch (error: any) {
			setError(error);
		}

		setLoading(false);
	};

	return (
		<main className="flex flex-col justify-center items-center h-screen px-10 relative">
			<ThemeSwitcher className="absolute top-5 right-5" />

			<h1 className="text-center text-4xl font-extrabold">
				Sign up to TVMaze App
			</h1>
			<p className="mt-4 mb-8 text-center text-sm">
				Already have an account?{" "}
				<Link
					to="/login"
					className="font-medium text-secondary hover:text-secondary-focus focus:outline-none focus:border-b focus:border-secondary"
				>
					Sign in here.
				</Link>
			</p>

			<div className="w-full max-w-md mx-auto bg-neutral shadow-md rounded-lg py-10 px-6 | auth-form">
				{error && <ErrorAlert error={error} closeError={() => setError("")} />}

				<form onSubmit={handleSubmit}>
					<div className="flex flex-col py-2">
						<label htmlFor="email" className="mb-1 text-sm font-medium">
							Email
						</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
							className="input input-bordered w-full"
						/>
					</div>
					<div className="flex flex-col py-2">
						<label htmlFor="password" className="mb-1 text-sm font-medium">
							Password
						</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
							className="input input-bordered w-full"
						/>
					</div>

					<div className="flex flex-col py-2">
						<label
							htmlFor="confirmPassword"
							className="mb-1 text-sm font-medium"
						>
							Confirm password
						</label>
						<input
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							type="password"
							id="confirmPassword"
							className="input input-bordered w-full"
						/>
					</div>

					<button
						type="submit"
						className={`mt-5 w-full btn btn-accent ${loading && "loading"}`}
					>
						Sign up
					</button>
				</form>
			</div>
		</main>
	);
};

export default LoginPage;
