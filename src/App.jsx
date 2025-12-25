import { Route, Router, Routes } from "react-router-dom";
import { Authorization, Home, Orders } from "./pages";
import { Header, NavigationBar } from "./components/shared";

function App() {
	return (
		<>
			<Header />
			<NavigationBar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/orders" element={<Orders />} />
				<Route path="/auth" element={<Authorization />} />
			</Routes>
		</>
	);
}

export default App;
