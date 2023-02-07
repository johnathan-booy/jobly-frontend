import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import Logo from "./Logo";
import UserContext from "./UserContext";

function Homepage() {
	const { currentUser } = useContext(UserContext);
	return (
		<div className="Homepage">
			<Logo className="Homepage-logo" />
			<h1>Jobly</h1>
			<h3>The One-Stop Job Shop</h3>

			<div className="Homepage-links">
				{!currentUser ? (
					<>
						<Link to="/login" className="App-button success">
							Login
						</Link>
						<Link to="/signup" className="App-button success">
							Sign Up
						</Link>
					</>
				) : (
					<>
						<Link to="/jobs" className="App-button success">
							Jobs
						</Link>
					</>
				)}
			</div>
		</div>
	);
}

export default Homepage;
