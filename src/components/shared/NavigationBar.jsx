import { BiFoodMenu } from "react-icons/bi";
import { LuNotebookPen } from "react-icons/lu";
import { IoStarHalfSharp, IoAnalyticsSharp } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { TbCalendarDollar } from "react-icons/tb";

import NavButton from "../NavButton";
import { Link } from "react-router-dom";

function NavigationBar() {
	const iconSize = 18;

	const menuItems = [
		{
			key: "newOrder",
			label: "New Order",
			icon: <LuNotebookPen size={iconSize} />,
		},
		{
			key: "currentOrder",
			label: "Current Orders",
			icon: <BiFoodMenu size={iconSize} />,
		},
		{
			key: "dailySales",
			label: "Daily Sales",
			icon: <TbCalendarDollar size={iconSize} />,
		},
		{
			key: "popularItems",
			label: "Popular Items",
			icon: <IoStarHalfSharp size={iconSize} />,
		},
		{
			key: "insights",
			label: "Customer Insights",
			icon: <IoAnalyticsSharp size={iconSize} />,
		},
		{
			key: "history",
			label: "Order History",
			icon: <MdHistory size={iconSize} />,
		},
	];

	return (
		<div className="fixed left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
			{menuItems.map(({ label, icon, key }, index) => {
				return (
					<Link to={"/" + key}>
						<NavButton
							key={index}
							label={label}
							icon={icon}
							className="text-[#ababab] w-[170px] flex justify-center items-center px-4 py-2 text-left cursor-[pointer]"
							selected={false}
						/>
					</Link>
				);
			})}
		</div>
	);
}

export default NavigationBar;
