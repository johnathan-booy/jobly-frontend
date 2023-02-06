import React, { useContext } from "react";
import * as Yup from "yup";
import UserContext from "./UserContext";
import GenericForm from "./GenericForm";
import "./Form.css";
import { Link } from "react-router-dom";

function LoginForm() {
	const { login } = useContext(UserContext);

	const fields = [
		{
			name: "username",
			label: "Username",
			type: "text",
			initialValue: "testuser",
			validation: Yup.string()
				.min(3, "Username must be at least 3 characters")
				.max(30, "Username must be at most 30 characters")
				.required("Username is required"),
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			initialValue: "password",
			validation: Yup.string()
				.min(6, "Password must be at least 6 characters")
				.required("Password is required"),
		},
	];

	const onSubmit = async (values) => {
		const { username, password } = values;
		await login(username, password);
	};

	return (
		<section className="Form-wrapper">
			<header>
				<h1>Login</h1>
				<em>
					Don't have an account? <Link to="/signup">Sign Up!</Link>
				</em>
			</header>
			<GenericForm fields={fields} onSubmit={onSubmit} />
		</section>
	);
}

export default LoginForm;
