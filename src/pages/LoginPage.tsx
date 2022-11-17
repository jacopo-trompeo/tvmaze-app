import { FormEvent, useState } from "react";
import { createUser } from "../firebase";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		const userCredential = await createUser(email, password);
		console.log(userCredential);
	};

	return (
		<form className="flex flex-col p-5 gap-5" onSubmit={handleLogin}>
			<label>
				Email:
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
