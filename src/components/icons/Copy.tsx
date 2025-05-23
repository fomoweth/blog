interface Props extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
	size?: number;
}

export default function Copy({ fill, size, strokeWidth, ...props }: Props) {
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
				d="M6 17C4.89543 17 4 16.1046 4 15V5C4 3.89543 4.89543 3 6 3H13C13.7403 3 14.3866 3.4022 14.7324 4M11 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H11C9.89543 7 9 7.89543 9 9V19C9 20.1046 9.89543 21 11 21Z"
				shapeRendering="geometricPrecision"
				stroke={fill || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth || 1.5}
			/>
		</svg>
	);
}
