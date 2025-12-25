export default function NavButton({
	icon,
	label,
	onClick,
	className,
	labelStyle,
	selected,
}) {
	return (
		<button
			onClick={onClick}
			className={className}
			style={
				selected
					? { color: "#f5f5f5", background: "#343434", borderRadius: "4px" }
					: {}
			}
		>
			<span className="inline mr-2">{icon}</span>
			<span style={labelStyle}>{label}</span>
		</button>
	);
}
