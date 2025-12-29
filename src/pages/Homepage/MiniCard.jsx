import React from "react";
import { Card, CardContent, CardTitle } from "../../components/shared";
import { FaAngleDoubleUp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";

function MiniCard({
	title,
	buttonIcon,
	descriptorValue,
	analyticNumber,
	buttonStyle,
	onButtonClick,
}) {
	return (
		<Card className="bg-[#1a1a1a] py-5 px-5 rounded-lg w-[50%]">
			<CardContent className="flex-col items-start  justify-between">
				<CardTitle className="flex justify-between items-center">
					<h1 className="text-[#f5f5f5] text-[18px] font-semibold tracking-wide">
						{title}
					</h1>

					<button
						onClick={onButtonClick}
						className="p-3 rounded-lg text-[#f5f5f5] text-2xl cursor-pointer"
						style={{ ...buttonStyle }}
					>
						{buttonIcon}
					</button>
				</CardTitle>

				<div className="flex-col items-start">
					<h1 className="text-[#f5f5f5] text-4xl font-bold mt-5">
						{descriptorValue}
					</h1>
					<h1 className="text-[#f5f5f5] text-lg mt-2 flex items-center gap-2">
						{analyticNumber > 0 ? (
							<span className="text-[#02ca3a] flex items-center">
								<FaAngleDoubleUp />
								{analyticNumber}%
							</span>
						) : (
							<span className="text-red">
								<FaAngleDoubleDown />
								{analyticNumber}%
							</span>
						)}
						than yesterday
					</h1>
				</div>
			</CardContent>
		</Card>
	);
}

export default MiniCard;
