import { BiFoodMenu } from "react-icons/bi";
import { LuNotebookPen } from "react-icons/lu";
import { IoStarHalfSharp, IoAnalyticsSharp } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { TbCalendarDollar } from "react-icons/tb";

import NavButton from "../NavButton";

function NavigationBar() {
	const iconSize = 18;
	const menuItems = [
		{ label: "New Order", icon: <LuNotebookPen size={iconSize} /> },
		{ label: "Current Orders", icon: <BiFoodMenu size={iconSize} /> },
		{ label: "Daily Sales", icon: <TbCalendarDollar size={iconSize} /> },
		{ label: "Popular Items", icon: <IoStarHalfSharp size={iconSize} /> },
		{
			label: "Customer Insights",
			icon: <IoAnalyticsSharp size={iconSize} />,
		},
		{ label: "Order History", icon: <MdHistory size={iconSize} /> },
	];

	return (
		<div className="fixed left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
			{menuItems.map(({ label, icon }, index) => {
				return (
					<NavButton
						key={index}
						label={label}
						icon={icon}
						className="text-[#ababab] w-[170px] flex justify-center items-center px-4 py-2 text-left cursor-[pointer]"
						selected={false}
					/>
				);
			})}
		</div>
	);
}

export default NavigationBar;
