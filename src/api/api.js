import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**
 * JoblyApi Class - Ties together methods used to communicate with the API
 *
 * This class serves as the interface between the frontend and the backend API.
 * It handles all the requests made to the API, including authentication,
 * CRUD operations on users and companies, and retrieving information on users and companies.
 *
 * Note: This class should only contain frontend-agnostic code and should not have any
 * knowledge of frontend implementation details.
 */
class JoblyApi {
	// Store the token for interaction with the API
	static setToken(newToken) {
		JoblyApi.token = newToken;
	}

	/**
	 * Sends a request to the API
	 *
	 * @param {string} endpoint - The endpoint for the API request
	 * @param {object} data - The data to be sent with the request
	 * @param {string} method - The HTTP method for the request
	 *
	 * @returns {Promise} - Promise containing the response data
	 *
	 * @throws {Array} - Array of error messages
	 */
	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	/** Login a user and return token */

	static async authUser(username, password) {
		let res = await this.request("auth/token", { username, password }, "post");
		return res;
	}
	/** Signup a user and return token */

	static async registerUser(username, password, firstName, lastName, email) {
		let res = await this.request(
			"auth/register",
			{ username, password, firstName, lastName, email },
			"post"
		);
		return res;
	}

	/** Update a user and return user */
	static async updateUser(username, firstName, lastName, email) {
		let res = await this.request(
			`users/${username}`,
			{ firstName, lastName, email },
			"patch"
		);
		return res;
	}

	/** Delete a user */
	static async deleteUser(username) {
		let res = await this.request(`users/${username}`, {}, "delete");
		return res;
	}

	/** Get details on a user by username. */

	static async getUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	/** Get details on all companies */

	static async getCompanies(name = "") {
		let res = await this.request(`companies`, { name: name });
		return res.companies;
	}

	/** Get details on a company by handle. */

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	/** Get details on all jobs */

	static async getJobs(title = "") {
		let res = await this.request(`jobs`, { title: title });
		return res.jobs;
	}

	/** Apply to a job */

	static async applyToJob(username, jobId) {
		let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
		return res.applied;
	}
}

export default JoblyApi;
