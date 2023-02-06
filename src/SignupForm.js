import React, { useContext } from "react";
import * as Yup from "yup";
import UserContext from "./UserContext";
import GenericForm from "./GenericForm";
import "./Form.css";
import { Link } from "react-router-dom";

function SignupForm() {
	const { signup } = useContext(UserContext);

	const fields = [
		{
			name: "username",
			label: "Username",
			type: "text",
			initialValue: "bonsaibooy",
			validation: Yup.string()
				.min(3, "Username must be at least 3 characters")
				.max(30, "Username must be at most 30 characters")
				.required("Username is required"),
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			initialValue: "ihavealittletree",
			validation: Yup.string()
				.min(6, "Password must be at least 6 characters")
				.required("Password is required"),
		},
		{
			name: "firstName",
			label: "First Name",
			type: "text",
			initialValue: "Johnathan",
			validation: Yup.string()
				.min(3, "First name must be at least 3 characters")
				.max(30, "First name must be at most 30 characters")
				.required("First name is required"),
		},
		{
			name: "lastName",
			label: "Last Name",
			type: "text",
			initialValue: "Booy",
			validation: Yup.string()
				.min(3, "Last name must be at least 3 characters")
				.max(30, "Last name must be at most 30 characters")
				.required("Last name is required"),
		},
		{
			name: "email",
			label: "Email",
			type: "email",
			initialValue: "bonsaibooy@shohin.com",
			validation: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
		},
	];

	const onSubmit = async (values) => {
		const { username, password, firstName, lastName, email } = values;
		await signup(username, password, firstName, lastName, email);
	};

	return (
		<section className="Form-wrapper">
			<header>
				<h1>Sign Up</h1>
				<em>
					Already have an account? <Link to="/login">Login!</Link>
				</em>
			</header>
			<GenericForm fields={fields} onSubmit={onSubmit} />
		</section>
	);
}

export default SignupForm;
