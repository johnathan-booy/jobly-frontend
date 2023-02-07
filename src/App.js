import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import JoblyApi from "./api/api";
import Navbar from "./navigation/Navbar";
import Routes from "./navigation/Routes";
import UserContext from "./auth/UserContext";
import useFlashMessages from "./hooks/useFlashMessages";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from "./common/LoadingSpinner";
import FlashContext from "./common/FlashContext";
import Section from "./section/Section";

/**
 * App is the main component that manages the state of the current user,
 * flash messages, and storage of token and username using the `useState`,
 * `useFlashMessages`, and `useLocalStorage` hooks.
 *
 * It also provides context for `UserContext` and `FlashContext` for their respective values and functions,
 * such as login, signup, updateProfile, deleteProfile, and logout.
 * The component also handles the rendering of the `Navbar` and `Routes` components.
 */

function App() {
	// Initialize state for current user
	const [currentUser, setCurrentUser] = useState(null);

	// Initialize state for user info load status
	const [infoLoaded, setInfoLoaded] = useState(false);

	// Initialize state for the ids of job applications
	const [applicationIds, setApplicationIds] = useState(new Set());

	// Get stored token and username from local storage
	const [storedToken, setStoredToken] = useLocalStorage("authToken", "");
	const [storedUsername, setStoredUsername] = useLocalStorage("username", "");

	// Get flash messages from `useFlashMessages` hook
	const [flashMessages, addFlashMessage] = useFlashMessages(3000);

	// Get the `history` object from `useHistory` hook
	const history = useHistory();

	useEffect(() => {
		const loadUserInfo = async () => {
			if (storedUsername && storedToken) {
				JoblyApi.setToken(storedToken);
				const user = await JoblyApi.getUser(storedUsername);
				setCurrentUser(user);
				setApplicationIds(new Set(user.applications));
			} else {
				setCurrentUser(null);
			}
			setInfoLoaded(true);
		};
		loadUserInfo();
	}, [storedUsername, storedToken]);

	const updateCredentials = (username = "", token = "") => {
		JoblyApi.setToken(token);
		setStoredToken(token);
		setStoredUsername(username);
	};

	const login = async (username, password) => {
		try {
			const { token } = await JoblyApi.authUser(username, password);
			updateCredentials(username, token);
			addFlashMessage("success", `Welcome, ${username}!`);
			history.push("/");
		} catch (error) {
			addFlashMessage("danger", error);
		}
	};

	const signup = async (username, password, firstName, lastName, email) => {
		try {
			const { token } = await JoblyApi.registerUser(
				username,
				password,
				firstName,
				lastName,
				email
			);
			updateCredentials(username, token);
			addFlashMessage("success", `Welcome, ${username}!`);
			history.push("/");
		} catch (error) {
			addFlashMessage("danger", error);
		}
	};

	const updateProfile = async (username, firstName, lastName, email) => {
		try {
			const { user } = await JoblyApi.updateUser(
				username,
				firstName,
				lastName,
				email
			);
			setCurrentUser(user);
			addFlashMessage("success", `Profile updated!`);
		} catch (error) {
			addFlashMessage("danger", error);
		}
	};

	const deleteProfile = async (username) => {
		try {
			await JoblyApi.deleteUser(username);
			updateCredentials();
			setCurrentUser(null);
			addFlashMessage("success", `Profile deleted! Hope to see you again.`);
			history.push("/");
		} catch (error) {
			addFlashMessage("danger", error);
		}
	};

	const logout = () => {
		updateCredentials();
		addFlashMessage("success", `See you later!`);
		history.push("/");
	};

	const hasAppliedToJob = (id) => {
		return applicationIds.has(id);
	};

	const applyToJob = async (id) => {
		if (hasAppliedToJob(id)) return;
		await JoblyApi.applyToJob(currentUser.username, id);
		setApplicationIds(new Set([...applicationIds, id]));
	};

	return (
		<div className="App">
			<UserContext.Provider
				value={{
					currentUser,
					login,
					logout,
					signup,
					updateProfile,
					deleteProfile,
					applyToJob,
					hasAppliedToJob,
				}}
			>
				<Navbar />
				<FlashContext.Provider value={{ flashMessages, addFlashMessage }}>
					{infoLoaded ? (
						<Routes />
					) : (
						<Section>
							<LoadingSpinner />
						</Section>
					)}
				</FlashContext.Provider>
			</UserContext.Provider>
		</div>
	);
}

export default App;
