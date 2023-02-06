import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "./Form.css";

function GenericForm({ fields, onSubmit }) {
	const initialValues = Object.fromEntries(
		fields.map((field) => [field.name, field.initialValue])
	);

	const validationSchema = Yup.object(
		Object.fromEntries(fields.map((field) => [field.name, field.validation]))
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
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
				<button className="Form-button success" type="submit">
					Submit
				</button>
			</Form>
		</Formik>
	);
}

export default GenericForm;
