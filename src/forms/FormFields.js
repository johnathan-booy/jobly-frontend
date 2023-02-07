import * as Yup from "yup";
/**
 * Class method containing Formik data and Yup validations for forms.
 * 
 * @example
 * getFields(["username", "password"])
 * // returns 
 		[
			...UsernameFieldData...,
			...PasswordFieldData...
		]
 */
class FormFields {
	/**
	 * Returns a filtered list of fields based on the given `fieldData` parameter.
	 * @param {Object} fieldData - An object with field names as keys and initial values as values.
	 * @return {Array<Field>} - A filtered list of field objects.
	 */
	static getFields(fieldData) {
		const fieldNames = Object.keys(fieldData);
		const filteredFields = this.fields.filter((field) =>
			fieldNames.includes(field.name)
		);

		return filteredFields.map((field) => ({
			...field,
			initialValue: fieldData[field.name],
		}));
	}

	/**
	 * @typedef {Array.<Field>} FormFields
	 * An array of field objects that describe the fields used in a form with Formik and Yup validation.
	 */
	static fields = [
		/**
		 * @typedef {Object} Field
		 * @property {string} name - The name of the field
		 * @property {string} label - The label for the field
		 * @property {string} type - The HTML input type for the field
		 * @property {string} initialValue - The initial value for the field
		 * @property {Object} validation - The Yup validation schema for the field
		 */
		{
			name: "username",
			label: "Username",
			type: "text",
			initialValue: "",
			validation: Yup.string()
				.min(3, "Username must be at least 3 characters")
				.max(30, "Username must be at most 30 characters")
				.required("Username is required"),
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			initialValue: "",
			validation: Yup.string()
				.min(6, "Password must be at least 6 characters")
				.required("Password is required"),
		},
		{
			name: "firstName",
			label: "First Name",
			type: "text",
			initialValue: "",
			validation: Yup.string()
				.min(3, "First name must be at least 3 characters")
				.max(30, "First name must be at most 30 characters")
				.required("First name is required"),
		},
		{
			name: "lastName",
			label: "Last Name",
			type: "text",
			initialValue: "",
			validation: Yup.string()
				.min(3, "Last name must be at least 3 characters")
				.max(30, "Last name must be at most 30 characters")
				.required("Last name is required"),
		},
		{
			name: "email",
			label: "Email",
			type: "email",
			initialValue: "",
			validation: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
		},
	];
}

export default FormFields;
