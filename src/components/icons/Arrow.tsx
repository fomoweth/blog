interface Props extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
	direction: "up" | "down" | "right" | "left";
	size?: number;
}

function resolve(direction: "up" | "down" | "right" | "left"): string {
	switch (direction) {
		case "up":
			return "M12 6v13m0-13 4 4m-4-4-4 4";

		case "right":
			return "M19 12H5m14 0-4 4m4-4-4-4";

		case "down":
			return "M12 19V5m0 14-4-4m4 4 4-4";

		case "left":
			return "M5 12h14M5 12l4-4m-4 4 4 4";
	}
}

export default function Arrow({
	direction,
	fill,
	size,
	strokeWidth,
	...props
}: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			height={size || 24}
			width={size || 24}
			fill="none"
			focusable="false"
			aria-hidden="true"
			{...props}
		>
			<path
				d={resolve(direction)}
				stroke={fill || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth || 2}
			/>
		</svg>
	);
}
