interface Props extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
	size?: number;
}

export default function Checked({ fill, size, strokeWidth, ...props }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			height={size || 20}
			width={size || 20}
			fill="none"
			stroke={fill || "currentColor"}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={strokeWidth || 2}
			focusable="false"
			aria-hidden="true"
			{...props}
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	);
}
