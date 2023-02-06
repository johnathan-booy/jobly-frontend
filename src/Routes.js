import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoadingSpinner from "./LoadingSpinner";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import UpdateProfileForm from "./UpdateProfileForm";

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
				<LoginForm />
			</Route>
			<Route exact path="/signup">
				<SignupForm />
			</Route>
			<Route exact path="/profile">
				<UpdateProfileForm />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
