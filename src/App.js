import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import JoblyApi from "./api";
import "./App.css";
import Navbar from "./Navbar";
import Routes from "./Routes";
import useFlashMessages from "./useFlashMessages";
import useLocalStorage from "./useLocalStorage";
import UserContext from "./UserContext";

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useLocalStorage("authToken", "");
	const [flashMessages, addFlashMessage] = useFlashMessages(5000);
	const history = useHistory();

	const login = async (username, password) => {
		try {
			const { token } = await JoblyApi.authUser(username, password);
			setToken(token);
			setCurrentUser({ username: username });
			addFlashMessage("success", `Welcome, ${username}!`);
			history.push("/");
		} catch (error) {
			addFlashMessage("danger", error);
		}
	};

	const logout = () => {
		setToken("");
		addFlashMessage("success", `See you later!`);
		history.push("/");
	};

	const signup = () => {
		setToken("");
	};

	useEffect(() => {
		const getUser = async () => {
			if (currentUser && token) {
				const username = currentUser.username;
				const user = await JoblyApi.getUser(username);
				console.log(currentUser);
				setCurrentUser(user);
			} else {
				setCurrentUser(null);
			}
		};
		getUser();
	}, [token]);

	return (
		<div className="App">
			<UserContext.Provider value={{ currentUser, login, logout, signup }}>
				<Navbar />

				<div className="App-body">
					{flashMessages.map((flash) => (
						<div className={`App-FlashMessage ${flash.type}`}>
							{flash.message}
						</div>
					))}
					<Routes login />
				</div>
			</UserContext.Provider>
		</div>
	);
}

export default App;
