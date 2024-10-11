interface Props extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
	size?: number;
}

export default function Tag({ fill, size, strokeWidth, ...props }: Props) {
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
				d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
				stroke={fill || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth || 2}
			/>
		</svg>
	);
}
