import React, { useContext } from "react";
import * as Yup from "yup";
import UserContext from "./UserContext";
import GenericForm from "./GenericForm";
import "./Form.css";
import { Link } from "react-router-dom";
import FormFields from "./FormFields";

function SignupForm() {
	const { signup } = useContext(UserContext);

	const fields = FormFields.getFields({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: "",
	});

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
