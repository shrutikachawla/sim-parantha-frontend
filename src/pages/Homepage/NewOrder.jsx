import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { categoriesApi, menuItemsApi } from "../../services";
import { Card, CardContent } from "../../components/shared";
import { Button } from "../../components/shared/button";

function NewOrder({ onOrderSubmit, addItemToOrder }) {
	const [categories, setCategories] = useState([]);
	const [menuItems, setMenuItems] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// Load categories and menu items on initial load
	useEffect(() => {
		const initializeData = async () => {
			try {
				setIsLoading(true);
				const categoriesData = await categoriesApi.getAll();
				setCategories(categoriesData);

				if (categoriesData && categoriesData.length > 0) {
					const firstCategoryId = categoriesData[0].id;
					setSelectedCategory(firstCategoryId.toString());

					// Fetch items for the first category right away
					const initialMenuItems = await menuItemsApi.getByCategory(
						firstCategoryId
					);
					setMenuItems(initialMenuItems);
					setIsLoading(false);
				}
			} catch (err) {
				console.error("Initialization failed", err);
				setIsLoading(false);
			}
		};

		initializeData();
	}, []);

	const handleCategoryChange = async (categoryId) => {
		setIsLoading(true);
		setSelectedCategory(categoryId); // Update UI selection

		// Trigger the fetch immediately in the same user action
		const data = await menuItemsApi.getByCategory(categoryId);
		setMenuItems(data);
		setIsLoading(false);
	};

	return (
		<section className="flex-col flex-1 w-full justify-between items-center py-4 px-8 mt-4 mb-10 basis-auto">
			<div className="flex-auto gap-2 w-full bg-[#1a1a1a] p-8 rounded-lg h-full justify-between">
				<div className="flex-col w-full">
					<h1 className="text-[#f5f5f5] text-[18px] font-semibold tracking-wide">
						Place new order
					</h1>
					<section className="mt-4 flex gap-4">
						{categories.map((category) => (
							<Button
								key={category.id}
								onClick={() => handleCategoryChange(category.id.toString())}
								className={`h-auto py-3 px-4 text-sm font-medium transition-all cursor-pointer ${
									selectedCategory === category.id.toString()
										? "bg-[#fb9933] hover:bg-[#fb9933]/90 text-white shadow-md"
										: "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
								}`}
							>
								{category.name}
							</Button>
						))}
					</section>
					<section className="mt-4 flex gap-4 w-full">
						{isLoading ? (
							<div className="justify-center m-auto">
								<Circles
									height="20"
									width="20"
									color="#4fa94d"
									wrapperClass=""
									visible={isLoading}
								/>
							</div>
						) : (
							menuItems.map((item) => (
								<Card
									key={item.id}
									className="w-full bg-white border border-[#d9d9d9] rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
									onClick={() => addItemToOrder(item)}
								>
									<CardContent className="relative flex flex-col items-center justify-center p-4 h-full min-h-[100px]">
										<div className="flex flex-col items-center justify-center flex-1 w-full">
											<div className="font-heading font-[number:var(--heading-font-weight)] text-[#1e1e1e] text-[length:var(--heading-font-size)] text-center tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)]">
												{item.name}
											</div>
										</div>
										<div className="absolute bottom-2 right-2 text-xs font-medium text-gray-600">
											Rs. {item.price}
										</div>
									</CardContent>
								</Card>
							))
						)}
					</section>
				</div>
			</div>
		</section>
	);
}

export default NewOrder;
