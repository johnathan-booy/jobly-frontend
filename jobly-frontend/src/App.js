import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import JoblyApi from "./api";
import "./App.css";
import Navbar from "./Navbar";
import Routes from "./Routes";
import useLocalStorage from "./useLocalStorage";
import UserContext from "./UserContext";

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useLocalStorage("authToken", "");
	const history = useHistory();

	const login = async (username, password) => {
		try {
			const { token } = await JoblyApi.authUser(username, password);
			setToken(token);
			setCurrentUser({ username: username });
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const logout = () => {
		setToken("");
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
					<Routes login />
				</div>
			</UserContext.Provider>
		</div>
	);
}

export default App;
