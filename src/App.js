import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import JoblyApi from "./api";
import Navbar from "./Navbar";
import Routes from "./Routes";
import UserContext from "./UserContext";
import useFlashMessages from "./useFlashMessages";
import useLocalStorage from "./useLocalStorage";
import LoadingSpinner from "./LoadingSpinner";
import FlashContext from "./FlashContext";
import Section from "./Section";

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [storedToken, setStoredToken] = useLocalStorage("authToken", "");
	const [storedUsername, setStoredUsername] = useLocalStorage("username", "");
	const [flashMessages, addFlashMessage] = useFlashMessages(3000);
	const history = useHistory();

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

	useEffect(() => {
		const loadUserInfo = async () => {
			if (storedUsername && storedToken) {
				JoblyApi.setToken(storedToken);
				const user = await JoblyApi.getUser(storedUsername);
				setCurrentUser(user);
			} else {
				setCurrentUser(null);
			}
			setInfoLoaded(true);
		};
		loadUserInfo();
	}, [storedUsername, storedToken]);

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
