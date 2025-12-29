import MiniCard from "./MiniCard";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import NewOrder from "./NewOrder";
import { useFieldArray, useForm } from "react-hook-form";
import { useCallback } from "react";
import CartSummary from "./CartSummary";
import { ordersApi } from "../../services";

function Home() {
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			mobileNumber: "",
			orderType: "",
			referenceNo: "",
			items: [], // This will be managed by useFieldArray
		},
	});

	const { fields, append, update } = useFieldArray({
		control,
		name: "items",
	});

	const onSubmit = (data) => {
		console.log("Final Order Payload:", data);
		ordersApi.create(data);
	};

	const handleAddItem = useCallback(
		(item) => {
			const existingIndex = fields.findIndex((f) => f.itemId === item.id);
			if (existingIndex > -1) {
				update(existingIndex, {
					...fields[existingIndex],
					quantity: fields[existingIndex].quantity + 1,
				});
			} else {
				console.log({ item }, item.id);
				append({
					itemId: item.id,
					name: item.name,
					price: item.price,
					quantity: 1,
				});
			}
		},
		[fields, append, update]
	);

	return (
		<section className="flex bg-[#1f1f1f] h-full">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex">
				{/*Left Div */}
				<div className="flex-[3] flex flex-col">
					<div className="flex items-center w-full gap-3 px-8 mt-8">
						<MiniCard
							title={"Total Earnings"}
							buttonIcon={<BsCashCoin size={20} />}
							buttonStyle={{ background: "#02ca3a" }}
							descriptorValue={512}
							analyticNumber={20}
						/>
						<MiniCard
							title={"Orders in Progress"}
							buttonIcon={<GrInProgress size={20} />}
							buttonStyle={{ background: "#f6b100" }}
							descriptorValue={12}
							analyticNumber={12}
						/>
					</div>
					<NewOrder addItemToOrder={handleAddItem} />
				</div>

				{/** Right Div */}
				<div className="flex-[2]">
					{/* RIGHT SIDE: Cart & Summary */}
					<CartSummary
						formControl={control}
						register={register}
						errors={errors}
						reset={reset}
					/>
				</div>
			</form>
		</section>
	);
}

export default Home;
