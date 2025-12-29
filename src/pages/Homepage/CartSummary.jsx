import { useFieldArray, useWatch } from "react-hook-form";
import { Button } from "../../components/shared/button";
import { Input } from "../../components/shared";
import { useMemo } from "react";

function CartSummary({ formControl, register, errors, reset }) {
	const watchedItems = useWatch({
		control: formControl,
		name: "items",
	});

	const { update } = useFieldArray({
		control: formControl,
		name: "items",
	});

	const totalAmount = useMemo(() => {
		return watchedItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
	}, [watchedItems]);

	return (
		<div>
			{
				<div className="lg:w-96 space-y-4">
					<div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
						<h2 className="text-xl font-bold mb-4">
							{/* Summary ({totals.count}) */}
						</h2>

						{/* List Items from FieldArray */}
						{watchedItems.map((field, index) => (
							<div
								key={field.id}
								className="flex justify-between items-center py-2"
							>
								<span>{field.name}</span>
								<div className="flex items-center gap-2">
									<Button
										type="button"
										size="sm"
										onClick={() =>
											update(index, {
												...field,
												quantity: field.quantity - 1,
											})
										}
									>
										-
									</Button>
									<span>{watchedItems[index]?.quantity}</span>
									<Button
										type="button"
										size="sm"
										onClick={() =>
											update(index, {
												...field,
												quantity: field.quantity + 1,
											})
										}
									>
										+
									</Button>
								</div>
							</div>
						))}

						<hr className="my-4" />

						{/* Form Inputs with Validation */}
						<div className="space-y-4">
							<Input
								{...register("mobileNumber", {
									required: true,
									pattern: /^\d{10}$/,
								})}
								placeholder="10-Digit Mobile"
								className={errors.mobileNumber ? "border-red-500" : ""}
							/>

							<div className="flex gap-4">
								{["table", "car", "delivery"].map((type) => (
									<label key={type} className="flex gap-2 capitalize">
										<input
											type="radio"
											value={type}
											{...register("orderType", { required: true })}
										/>
										{type}
									</label>
								))}
							</div>

							<Input
								{...register("referenceNo", {
									required: "Reference is required",
								})}
								placeholder="Ref (e.g. Table 5)"
							/>
						</div>

						<Button
							type="submit"
							className="w-full mt-6 bg-green-600 hover:bg-green-700 h-12 text-white"
						>
							Place Order (Rs. {totalAmount})
						</Button>
					</div>
				</div>
			}
		</div>
	);
}

export default CartSummary;
