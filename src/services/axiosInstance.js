import axios from "axios";

// Move these to a constants file later!
const API_BASE_URL =
	import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const AUTH_TOKEN_KEY = "auth_token";

const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000, // Good practice to add a timeout
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(AUTH_TOKEN_KEY);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response.data, // Return data directly to avoid .data.data in components
	(error) => {
		const message = error.response?.data?.message || "Something went wrong";

		if (error.response?.status === 401) {
			localStorage.removeItem(AUTH_TOKEN_KEY);
			// Use window.location.href if you aren't using a routing library hook
			window.location.href = "/login?expired=true";
		}

		// Return a standardized error object
		return Promise.reject({ ...error, message });
	}
);

export default api;
