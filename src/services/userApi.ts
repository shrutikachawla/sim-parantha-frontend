import api from "./axiosInstance";
import { ApiResponse } from "./product.types";

// Auth API
export const authApi = {
	login: async (username: string, password: string) => {
		const response = await api.post<ApiResponse<{ user: any; token: string }>>(
			"/login",
			{
				username,
				password,
			}
		);
		return response.data;
	},
	logout: async () => {
		const response = await api.post<ApiResponse<null>>("/logout");
		return response.data;
	},
	fetchUser: async (token: string) => {
		const response = await api.get("/user");
		return response.data;
	},
};
