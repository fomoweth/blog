interface Props extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
	size?: number;
}

export default function Download({ fill, size, strokeWidth, ...props }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			height={size || 20}
			width={size || 20}
			fill="none"
			focusable="false"
			aria-hidden="true"
			{...props}
		>
			<path
				d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
				stroke={fill || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth || 2}
			/>
		</svg>
	);
}
