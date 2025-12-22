import { Route, Router, Routes } from "react-router-dom";
import { Authorization, Home, Orders } from "./pages";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/auth" element={<Authorization />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
