export type OrderType = "table" | "car" | "delivery";

export interface Category {
	id: number;
	name: string;
	created_at?: string;
	updated_at?: string;
}

export interface MenuItem {
	id: number;
	name: string;
	price: number;
	category_id: number;
	category?: Category;
	created_at?: string;
	updated_at?: string;
}

export interface OrderItem {
	id?: number;
	menu_item_id: number;
	custom?: string;
	quantity: number;
	price?: number;
	menu_item?: MenuItem;
}

export interface Order {
	id?: number;
	order_number: string;
	mobile_number: string;
	order_type: OrderType;
	reference_no: string;
	total: number;
	status: "in-progress" | "completed";
	time_remaining: number;
	is_archived?: boolean;
	archived_at?: string;
	parent_id?: number;
	parent_order?: Order;
	order_items?: OrderItem[];
	created_at?: string;
	updated_at?: string;
	completed_at?: string;
	timer_started_at?: string;
}

export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message: string;
	timestamp: string;
}
