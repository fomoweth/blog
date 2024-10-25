interface Props extends Omit<React.ComponentProps<"svg">, "height" | "width"> {
	size?: number;
}

export default function Info({ fill, size, ...props }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 15 15"
			height={size || 20}
			width={size || 20}
			fill="none"
			focusable="false"
			aria-hidden="true"
			{...props}
		>
			<path
				d="M7.9987 13.5755C11.5425 13.5755 14.4154 10.7027 14.4154 7.15885C14.4154 3.61502 11.5425 0.742188 7.9987 0.742188C4.45487 0.742188 1.58203 3.61502 1.58203 7.15885C1.58203 10.7027 4.45487 13.5755 7.9987 13.5755Z"
				stroke={fill || "currentColor"}
				strokeWidth={1.16667}
			/>
			<path
				d="M8.58359 10.6607V6.11068H7.41693V10.6607H8.58359ZM7.18359 4.59401C7.18359 5.06068 7.53359 5.29401 8.00026 5.29401C8.46693 5.29401 8.81693 4.94401 8.81693 4.59401C8.81693 4.12734 8.46693 3.77734 8.00026 3.77734C7.53359 3.77734 7.18359 4.12734 7.18359 4.59401Z"
				fill={fill || "currentColor"}
			/>
		</svg>
	);
}
