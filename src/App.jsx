import {
	Route,
	useLocation,
	Routes,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { Home, Orders } from "./pages";
import { useAuth } from "./context/AuthContext";
import { AuthorizationModal, Header, NavigationBar } from "./components";

function App() {
	const location = useLocation();
	const { isAuthenticated, user } = useAuth();
	const navigate = useNavigate();
	console.log({ isAuthenticated, user });
	return (
		<>
			<Header />
			<NavigationBar currentPath={location} />
			{!isAuthenticated && (
				<AuthorizationModal
					isOpen={true}
					onClose={() => {
						navigate("/newOrder");
					}}
				/>
			)}
			<Routes>
				<Route path="/" element={<Navigate to="/newOrder" replace />} />
				<Route path="/newOrder" element={<Home />} />
				<Route path="/currentOrder" element={<Orders />} />
				<Route path="/*" element={<Navigate to="/newOrder" replace />} />
			</Routes>
		</>
	);
}

export default App;
