import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "../components/icons/CloseIcon";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { createUser } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email || !password || !confirmPassword) {
			setError("Please fill in all fields");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const user = await createUser(email, password);
			navigate("/");
		} catch (err: any) {
			if (err.code === "auth/email-already-in-use") {
				setError("Email already in use");
			}
		}
	};

	return (
		<main className="flex flex-col justify-center items-center h-screen px-10">
			<h2 className="text-center text-4xl font-extrabold">
				Sign up to TVMaze App
			</h2>
			<p className="mt-4 mb-8 text-center text-sm">
				Already have an account?{" "}
				<Link
					to="/login"
					className="font-medium text-secondary hover:text-secondary-focus focus:outline-none focus:border-b focus:border-secondary"
				>
					Sign in here.
				</Link>
			</p>

			<div className="w-full max-w-md mx-auto bg-neutral shadow-md rounded-lg py-10 px-6">
				{error && (
					<div className="flex mb-5 w-full py-2 px-4 rounded-md text-sm font-medium text-primary-content bg-error">
						<p>{error}</p>
						<button
							className="ml-auto cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-primary-content"
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
							className="mb-1 text-sm font-medium"
						>
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
						<label
							htmlFor="password"
							className="mb-1 text-sm font-medium"
						>
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
						className="mt-5 w-full btn btn-primary"
					>
						Sign up
					</button>
				</form>
			</div>
		</main>
	);
};

export default LoginPage;
