import api from "./axiosInstance";
import { ApiResponse, Order, OrderType } from "./product.types";

export const ordersApi = {
	getAll: async (status?: "in-progress" | "completed", date?: string) => {
		const params: any = {};
		if (status) params.status = status;
		if (date) params.date = date;
		const response = await api.get<ApiResponse<Order[]>>("/orders", { params });
		return response.data;
	},
	getByOrderNumber: async (orderNumber: string) => {
		const response = await api.get<ApiResponse<Order>>(
			`/orders/${orderNumber}`
		);
		return response.data;
	},
	create: async (data: {
		mobile_number: string;
		order_type: OrderType;
		reference_no: string;
		items: { menu_item_id: number; quantity: number }[];
	}) => {
		const response = await api.post<ApiResponse<Order>>("/orders", data);
		return response.data;
	},
	updateStatus: async (orderNumber: string, status: "completed") => {
		const response = await api.patch<ApiResponse<Order>>(
			`/orders/${orderNumber}/status`,
			{ status }
		);
		return response.data;
	},
	updateTime: async (orderNumber: string, timeRemaining: number) => {
		const response = await api.patch<ApiResponse<Order>>(
			`/orders/${orderNumber}/time`,
			{
				time_remaining: timeRemaining,
			}
		);
		return response.data;
	},
	archive: async (orderNumber: string) => {
		const response = await api.patch<ApiResponse<Order>>(
			`/orders/${orderNumber}/archive`
		);
		return response.data;
	},
	archiveAllCompleted: async () => {
		const response = await api.post<ApiResponse<{ archived_count: number }>>(
			"/orders/archive-bulk"
		);
		return response.data;
	},
	edit: async (
		orderNumber: string,
		data: {
			mobile_number: string;
			order_type: OrderType;
			reference_no: string;
			items: {
				menu_item_id: number;
				quantity: number;
				price?: number;
				name?: string;
			}[];
		}
	) => {
		const response = await api.post<ApiResponse<Order>>(
			`/orders/${orderNumber}/edit`,
			data
		);
		return response.data;
	},
};
