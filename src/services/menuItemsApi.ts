import api from "./axiosInstance";
import { ApiResponse, MenuItem } from "./product.types";

// Menu Items API
export const menuItemsApi = {
	getByCategory: async (categoryId?: number) => {
		const params = categoryId ? { category_id: categoryId } : {};
		const response = await api.get<ApiResponse<MenuItem[]>>("/menu-items", {
			params,
		});
		return response.data;
	},
	getById: async (id: number) => {
		const response = await api.get<ApiResponse<MenuItem>>(`/menu-items/${id}`);
		return response.data;
	},
	create: async (data: {
		name: string;
		price: number;
		category_id: number;
	}) => {
		const response = await api.post<ApiResponse<MenuItem>>("/menu-items", data);
		return response.data;
	},
	update: async (
		id: number,
		data: Partial<{ name: string; price: number; category_id: number }>
	) => {
		const response = await api.patch<ApiResponse<MenuItem>>(
			`/menu-items/${id}`,
			data
		);
		return response.data;
	},
	delete: async (id: number) => {
		const response = await api.delete<ApiResponse<null>>(`/menu-items/${id}`);
		return response.data;
	},
};
