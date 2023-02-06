import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoadingSpinner from "./LoadingSpinner";
import LoginForm from "./LoginForm";
import PrivateRoute from "./PrivateRoute";
import SignupForm from "./SignupForm";
import UpdateProfileForm from "./UpdateProfileForm";

function Routes({ addFlashMessage }) {
	return (
		<Switch>
			<Route exact path="/">
				<h1>Homepage</h1>
			</Route>
			<PrivateRoute exact path="/companies" addFlashMessage={addFlashMessage}>
				<CompanyList />
			</PrivateRoute>
			<PrivateRoute path="/companies/:handle" addFlashMessage={addFlashMessage}>
				<CompanyDetails />
			</PrivateRoute>
			<PrivateRoute exact path="/jobs" addFlashMessage={addFlashMessage}>
				<JobList />
			</PrivateRoute>
			<Route exact path="/login">
				<LoginForm />
			</Route>
			<Route exact path="/signup">
				<SignupForm />
			</Route>
			<PrivateRoute exact path="/profile" addFlashMessage={addFlashMessage}>
				<UpdateProfileForm />
			</PrivateRoute>
			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
