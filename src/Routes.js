import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import CompanyList from "./CompanyList";
import Homepage from "./Homepage";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import PrivateRoute from "./PrivateRoute";
import Section from "./Section";
import SignupForm from "./SignupForm";
import UpdateProfileForm from "./UpdateProfileForm";

function Routes({ addFlashMessage }) {
	return (
		<Switch>
			<Route exact path="/">
				<Section type="full">
					<Homepage />
				</Section>
			</Route>
			<PrivateRoute exact path="/companies" addFlashMessage={addFlashMessage}>
				<Section>
					<CompanyList />
				</Section>
			</PrivateRoute>
			<PrivateRoute path="/companies/:handle" addFlashMessage={addFlashMessage}>
				<Section>
					<Route
						path="/companies/:handle"
						render={({ match }) => (
							<CompanyDetails handle={match.params.handle} />
						)}
					/>
				</Section>
			</PrivateRoute>

			<PrivateRoute exact path="/jobs" addFlashMessage={addFlashMessage}>
				<Section>
					<JobList />
				</Section>
			</PrivateRoute>
			<Route exact path="/login">
				<Section>
					<LoginForm />
				</Section>
			</Route>
			<Route exact path="/signup">
				<Section>
					<SignupForm />
				</Section>
			</Route>
			<PrivateRoute exact path="/profile" addFlashMessage={addFlashMessage}>
				<Section>
					<UpdateProfileForm />
				</Section>
			</PrivateRoute>
			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
