import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import CompanyList from "./CompanyList";
import JobList from "./JobList";

function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<h1>Homepage</h1>
			</Route>
			<Route exact path="/companies">
				<CompanyList />
			</Route>
			<Route path="/companies/:handle">
				<CompanyDetails />
			</Route>
			<Route exact path="/jobs">
				<JobList />
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
