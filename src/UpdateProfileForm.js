import React, { useContext } from "react";
import * as Yup from "yup";
import UserContext from "./UserContext";
import GenericForm from "./GenericForm";
import "./Form.css";

function UpdateProfileForm() {
	const { updateProfile, deleteProfile, currentUser } = useContext(UserContext);

	const fields = [
		{
			name: "firstName",
			label: "First Name",
			type: "text",
			initialValue: currentUser.firstName,
			validation: Yup.string()
				.min(3, "First name must be at least 3 characters")
				.max(30, "First name must be at most 30 characters")
				.required("First name is required"),
		},
		{
			name: "lastName",
			label: "Last Name",
			type: "text",
			initialValue: currentUser.lastName,
			validation: Yup.string()
				.min(3, "Last name must be at least 3 characters")
				.max(30, "Last name must be at most 30 characters")
				.required("Last name is required"),
		},
		{
			name: "email",
			label: "Email",
			type: "email",
			initialValue: currentUser.email,
			validation: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
		},
	];

	const onSubmitUpdate = async (values) => {
		const { firstName, lastName, email } = values;
		const { username } = currentUser;
		await updateProfile(username, firstName, lastName, email);
	};

	const onSubmitDelete = async (e) => {
		e.preventDefault();
		const { username } = currentUser;
		await deleteProfile(username);
	};

	return (
		<section className="Form-wrapper">
			<header>
				<h1>Update Profile</h1>
			</header>
			<GenericForm fields={fields} onSubmit={onSubmitUpdate} />
			<br />
			<form className="Form" onSubmit={onSubmitDelete}>
				<p>
					<i>Goodbye forever...or until you get lonely and come back.</i>
				</p>
				<button className="Form-button danger" type="submit">
					Delete
				</button>
			</form>
		</section>
	);
}

export default UpdateProfileForm;
