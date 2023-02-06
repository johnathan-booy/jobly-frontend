import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "./UserContext";

function PrivateRoute({ exact, to, children, addFlashMessage }) {
	const { currentUser } = useContext(UserContext);

	useEffect(() => {
		if (!currentUser) {
			addFlashMessage("danger", "Please login first!");
		}
	}, [currentUser, addFlashMessage]);

	if (!currentUser) return <Redirect to="/login" />;

	return (
		<Route exact={exact} to={to}>
			{children}
		</Route>
	);
}

export default PrivateRoute;
