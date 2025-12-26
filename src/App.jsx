import { Route, useLocation, Routes, Navigate } from "react-router-dom";
import { Authorization, Home, Orders } from "./pages";
import { Header, NavigationBar } from "./components/shared";
import { useAuth } from "./context/AuthContext";

function App() {
	const location = useLocation();
	const { isAuthenticated } = useAuth();
	return (
		<>
			<Header />
			<NavigationBar currentPath={location} />
			{!isAuthenticated && <Authorization />}
			<Routes>
				<Route path="/" element={<Navigate to="/newOrder" replace />} />
				<Route path="/newOrder" element={<Home />} />
				<Route path="/orders" element={<Orders />} />
				<Route path="*" element={<Navigate to="/newOrder" replace />} />
			</Routes>
		</>
	);
}

export default App;
