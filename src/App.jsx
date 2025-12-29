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
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
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

			<div className="relative h-[calc(100vh-(var(--spacing)*34))]">
				<Routes>
					<Route path="/" element={<Navigate to="/newOrder" replace />} />
					<Route path="/newOrder" element={<Home />} />
					<Route path="/currentOrder" element={<Orders />} />
					<Route path="/*" element={<Navigate to="/newOrder" replace />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
