interface Props extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
	size?: number;
}

export default function Folder({ fill, size, ...props }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size || 24}
			height={size || 24}
			fill={fill || "currentColor"}
			focusable="false"
			aria-hidden="true"
			{...props}
		>
			<path
				d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z"
				clipRule="evenodd"
				fillRule="evenodd"
			/>
		</svg>
	);
}
