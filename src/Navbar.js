import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import UserContext from "./UserContext";
import Logo from "./Logo";

function Navbar() {
	const { logout, currentUser } = useContext(UserContext);
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="Navbar">
			<div className="Navbar-company">
				<Link to="/">
					<Logo className="Navbar-logo" />
					<div className="Navbar-title">Jobly</div>
				</Link>
			</div>

			<button className="Navbar-toggle" onClick={() => setOpen(!isOpen)}>
				&#9776;
			</button>

			<div
				className={`Navbar-links ${isOpen ? "Navbar-links-open" : ""}`}
				onClick={() => setOpen(false)}
			>
				{currentUser ? (
					<>
						<NavLink to="/companies">
							<span>Companies</span>
						</NavLink>
						<NavLink to="/jobs">
							<span>Jobs</span>
						</NavLink>
						<NavLink to="/profile">
							<span>Profile</span>
						</NavLink>
						<Link to="/" onClick={logout}>
							<span>
								Logout <b>{currentUser.username}</b>
							</span>
						</Link>
					</>
				) : (
					<>
						<NavLink to="/login">
							<span>Login</span>
						</NavLink>
						<NavLink to="/signup">
							<span>Sign Up</span>
						</NavLink>
					</>
				)}
			</div>
		</div>
	);
}

export default Navbar;
