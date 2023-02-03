import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
	const [isOpen, setOpen] = useState(false);
	const links = [
		{ name: "Companies", path: "/companies" },
		{ name: "Jobs", path: "/jobs" },
		{ name: "Login", path: "/login" },
		{ name: "Signup", path: "/signup" },
		{ name: "Profile", path: "/profile" },
	];

	return (
		<div className="Navbar">
			<div className="Navbar-title">
				<Link to="/">
					<i className="fa-brands fa-connectdevelop"></i> Jobly
				</Link>
			</div>

			<button className="Navbar-toggle" onClick={() => setOpen(!isOpen)}>
				&#9776;
			</button>

			<div className={`Navbar-links ${isOpen ? "Navbar-links-open" : ""}`}>
				{links.map((link) => (
					<NavLink
						key={link.name}
						to={link.path}
						onClick={() => setOpen(false)}
					>
						<span>{link.name}</span>
					</NavLink>
				))}
			</div>
		</div>
	);
}

export default Navbar;
