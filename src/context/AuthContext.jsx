import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem("auth_token")
	);
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!isAuthenticated) return;

		const controller = new AbortController();

		const fetchData = async () => {
			try {
				// Pass the signal to your API helper
				const response = await authApi.fetchUser({ signal: controller.signal });
				setUser(response);
			} catch (error) {
				if (error.name !== "AbortError") {
					console.error("Actual fetch error:", error);
				}
			}
		};

		fetchData();

		return () => controller.abort(); // Cancel the request on cleanup
	}, [isAuthenticated]);

	const login = async (username, password) => {
		try {
			const { token, user: userData } = await authApi.login(username, password);
			localStorage.setItem("auth_token", token);
			setUser(userData);
			setIsAuthenticated(true);
			return { success: true };
		} catch (error) {
			console.error("Login failed:", error);
			throw error; // Let the UI handle the error message
		}
	};
	const logout = async () => {
		try {
			// Optional: Notify the server we are logging out
			await authApi.logout();
		} catch (error) {
			console.error("Server logout failed", error);
		} finally {
			// Always clear local state even if the API call fails
			localStorage.removeItem("auth_token");
			setUser(null);
			setIsAuthenticated(false);
		}
	};
	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
