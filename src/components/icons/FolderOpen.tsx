interface Props extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
	size?: number;
}

export default function FolderOpen({ fill, size, ...props }: Props) {
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
				d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 .087.586l2.977-7.937A1 1 0 0 1 6 10h12V9a2 2 0 0 0-2-2h-4.532l-1.9-2.28A2 2 0 0 0 8.032 4H4Zm2.693 8H6.5l-3 8H18l3-8H6.693Z"
				clipRule="evenodd"
				fillRule="evenodd"
			/>
		</svg>
	);
}
