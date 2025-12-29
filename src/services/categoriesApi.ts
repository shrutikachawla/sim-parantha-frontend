import api from "./axiosInstance";
import { ApiResponse, Category } from "./product.types";

// Categories API
export const categoriesApi = {
	getAll: async () => {
		const response = await api.get<ApiResponse<Category[]>>("/categories");
		return response.data;
	},
	getById: async (id: number) => {
		const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
		return response.data;
	},
	create: async (data: { name: string }) => {
		const response = await api.post<ApiResponse<Category>>("/categories", data);
		return response.data;
	},
	update: async (id: number, data: { name: string }) => {
		const response = await api.patch<ApiResponse<Category>>(
			`/categories/${id}`,
			data
		);
		return response.data;
	},
	delete: async (id: number) => {
		const response = await api.delete<ApiResponse<null>>(`/categories/${id}`);
		return response.data;
	},
};
