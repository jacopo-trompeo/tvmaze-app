import { FormEvent, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const credentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log(credentials);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form className="flex flex-col p-5 gap-5" onSubmit={handleLogin}>
			<label>
				Email
				<input
					type="text"
					name="email"
					className="border border-stone-900"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>
			<label>
				Password:
				<input
					type="password"
					name="password"
					className="border border-stone-900"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<input
				type="submit"
				value="Submit"
				className="cursor-pointer bg-stone-300 py-2 px-5 rounded-md w-40"
			/>
		</form>
	);
};

export default LoginPage;
