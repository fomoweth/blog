interface Props extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
	direction: "up" | "right" | "down" | "left";
	variant: "single" | "double";
	size?: number;
}

function resolve(
	direction: "up" | "right" | "down" | "left",
	variant: "single" | "double",
): string {
	switch (direction) {
		case "up":
			return variant === "double"
				? "m16 17-4-4-4 4m8-6-4-4-4 4"
				: "m5 15 7-7 7 7";

		case "right":
			return variant === "double"
				? "m7 16 4-4-4-4m6 8 4-4-4-4"
				: "m9 5 7 7-7 7";

		case "down":
			return variant === "double"
				? "m8 7 4 4 4-4m-8 6 4 4 4-4"
				: "m19 9-7 7-7-7";

		case "left":
			return variant === "double"
				? "m17 16-4-4 4-4m-6 8-4-4 4-4"
				: "m15 19-7-7 7-7";
	}
}

export default function Chevron({
	direction,
	variant,
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
				d={resolve(direction, variant)}
				stroke={fill || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth || 2}
			/>
		</svg>
	);
}
