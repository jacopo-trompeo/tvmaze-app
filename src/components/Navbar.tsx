import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";
import StatsIcon from "./icons/StatsIcon";

const Navbar = () => {
	const { logOut, user } = useAuth();

	return (
		<nav className="navbar bg-base-100 mb-10 p-3 md:p-5 sticky top-0 z-50">
			<div className="flex-1">
				<Link
					to={"/"}
					className="normal-case text-xl sm:text-2xl md:text-4xl font-bold"
				>
					<span className="text-accent">TVMaze</span> App
				</Link>
			</div>

			<ThemeSwitcher />

			<ul className="menu menu-horizontal">
				<li className="sm:block hidden">
					<Link
						className="btn btn-ghost rounded-full mx-5 font-bold active:bg-accent"
						to={"/ranking"}
					>
						Rankings
					</Link>
				</li>
				<li className="sm:hidden">
					<Link className="mx-3 rounded-full active:bg-accent" to={"/ranking"}>
						<StatsIcon />
					</Link>
				</li>
			</ul>

			<div className="dropdown dropdown-end">
				<label
					tabIndex={0}
					className="btn btn-ghost md:btn-lg btn-circle avatar"
				>
					<div className="w-20 rounded-full">
						<img
							src={`https://avatars.dicebear.com/api/initials/${user?.email}.svg`}
						/>
					</div>
				</label>
				<ul
					tabIndex={0}
					className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 ring-1 ring-accent"
				>
					<li>
						<Link to={"/profile"}>Profile</Link>
					</li>
					<li>
						<button onClick={() => logOut()}>Logout</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
