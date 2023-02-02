import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CompanyList from "./CompanyList";

function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<h1>Homepage</h1>
			</Route>
			<Route exact path="/companies">
				<CompanyList />
			</Route>
			<Route path="/companies/:name">
				<h1>One company</h1>
			</Route>
			<Route exact path="/jobs">
				<h1>All jobs</h1>
			</Route>
			<Route exact path="/login">
				<h1>Login</h1>
			</Route>
			<Route exact path="/signup">
				<h1>Signup</h1>
			</Route>
			<Route exact path="/profile">
				<h1>Edit profile</h1>
			</Route>
			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
