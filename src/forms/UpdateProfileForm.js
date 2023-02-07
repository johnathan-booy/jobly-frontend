import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import GenericForm from "./GenericForm";
import "./Form.css";
import FormFields from "./FormFields";

function UpdateProfileForm() {
	const { updateProfile, deleteProfile, currentUser } = useContext(UserContext);

	const fields = FormFields.getFields({
		firstName: currentUser.firstName,
		lastName: currentUser.lastName,
		email: currentUser.email,
	});

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
				<button className="App-button danger" type="submit">
					Delete
				</button>
			</form>
		</section>
	);
}

export default UpdateProfileForm;
