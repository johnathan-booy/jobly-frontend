import "./App.css";
import Navbar from "./Navbar";
import Routes from "./Routes";

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className="App-body">
				<Routes />
			</div>
		</div>
	);
}

export default App;
