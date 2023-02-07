import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import GenericForm from "./GenericForm";
import "./Form.css";
import { Link } from "react-router-dom";
import FormFields from "./FormFields";

function LoginForm() {
	const { login } = useContext(UserContext);

	const fields = FormFields.getFields({
		username: "testuser",
		password: "password",
	});

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
