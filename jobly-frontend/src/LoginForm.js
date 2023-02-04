import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "./Form.css";
import JoblyApi from "./api";
import UserContext from "./UserContext";

function LoginForm() {
	const { login, logout } = useContext(UserContext);

	const fields = [
		{ name: "username", label: "Username", type: "text" },
		{ name: "password", label: "Password", type: "password" },
	];

	return (
		<Formik
			initialValues={{
				username: "testuser",
				password: "password",
			}}
			validationSchema={Yup.object({
				username: Yup.string()
					.min(3, "Username must be at least 3 characters")
					.max(30, "Username must be at most 30 characters")
					.required("Username is required"),
				password: Yup.string()
					.min(6, "Password must be at least 6 characters")
					.required("Password is required"),
			})}
			onSubmit={async (values) => {
				const { username, password } = values;
				login(username, password);
			}}
		>
			<Form className="Form">
				{fields.map((field) => {
					const { name, label, type } = field;
					return (
						<div className="Form-group" key={name}>
							<label className="Form-label" htmlFor={name}>
								{label}
							</label>
							<Field className="Form-input" type={type} name={name} />
							<div className="Form-error">
								<ErrorMessage name={name} />
							</div>
						</div>
					);
				})}
				<button className="Form-submit" type="submit">
					Submit
				</button>
			</Form>
		</Formik>
	);
}

export default LoginForm;
