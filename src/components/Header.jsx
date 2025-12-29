import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import headerLogo from "../assets/sim-paranthas-logo.png";
import { useAuth } from "../context/AuthContext";

function Header() {
	const { user } = useAuth();
	return (
		<header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a] h-18">
			<div className="flex">
				<img src={headerLogo} className="h-12 w-20" alt="restro logo" />
			</div>

			{/* SEARCH */}
			<div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[500px]">
				<FaSearch className="text-[#f5f5f5]" />
				<input
					type="text"
					placeholder="Search"
					className="bg-[#1f1f1f] outline-none text-[#f5f5f5]"
				/>
			</div>

			{/* LOGGED IN USER DETAILS*/}
			<div className="flex items-center gap-4">
				<div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
					<FaBell className="text-[#f5f5f5] text-2xl" />
				</div>
				<div className="flex items-center gap-3 cursor-pointer">
					<FaUserCircle className="text-[#f5f5f5] text-4xl" />
					<div className="flex flex-col items-start">
						<h1 className="text-md text-[#ffffff] ">{user?.name}</h1>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
