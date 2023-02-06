import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import JoblyApi from "./api";
import Navbar from "./Navbar";
import Routes from "./Routes";
import UserContext from "./UserContext";
import useFlashMessages from "./useFlashMessages";
import useLocalStorage from "./useLocalStorage";

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [storedToken, setStoredToken] = useLocalStorage("authToken", "");
	const [storedUsername, setStoredUsername] = useLocalStorage("username", "");
	const [flashMessages, addFlashMessage] = useFlashMessages(2000);
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
		const getUser = async () => {
			if (storedUsername && storedToken) {
				JoblyApi.setToken(storedToken);
				const user = await JoblyApi.getUser(storedUsername);
				setCurrentUser(user);
			} else {
				setCurrentUser(null);
			}
		};
		getUser();
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

				<div className="App-body">
					{flashMessages.map((flash) => (
						<div
							className={`App-FlashMessage ${flash.type}`}
							key={flash.message}
						>
							{flash.message}
						</div>
					))}
					<Routes />
				</div>
			</UserContext.Provider>
		</div>
	);
}

export default App;
