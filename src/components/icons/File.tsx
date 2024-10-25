interface Props extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
	size?: number;
}

export default function File({ fill, size, ...props }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size || 24}
			height={size || 24}
			fill="none"
			focusable="false"
			aria-hidden="true"
			{...props}
		>
			<path
				d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
				stroke={fill || "currentColor"}
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	);
}
