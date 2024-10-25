import { type PortableTextBlock, toPlainText } from "next-sanity";

import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	content: Array<PortableTextBlock>;
	wordsPerMinute?: number;
}

export default function ReadTime({
	className,
	content,
	wordsPerMinute = 200,
}: Props) {
	const words = toPlainText(content).split(/\s+/);
	const estimated = Math.ceil(words.length / wordsPerMinute);

	return (
		<small className={cn("inline-flex items-center gap-1", className)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				height={18}
				width={18}
				fill="currentColor"
			>
				<path
					d="M11.9963 4C13.5785 4 15.1252 4.46919 16.4408 5.34824C17.7564 6.22729 18.7818 7.47672 19.3873 8.93853C19.9928 10.4003 20.1512 12.0089 19.8426 13.5607C19.5339 15.1126 18.772 16.538 17.6531 17.6569C16.5343 18.7757 15.1089 19.5376 13.557 19.8463C12.0052 20.155 10.3966 19.9965 8.93481 19.391C7.473 18.7855 6.22358 17.7602 5.34452 16.4446C4.46547 15.129 3.99628 13.5823 3.99628 12C3.99871 9.87901 4.84234 7.84559 6.34211 6.34583C7.84187 4.84606 9.87529 4.00243 11.9963 4ZM11.9963 2C10.0185 2 8.08507 2.58649 6.44058 3.6853C4.79609 4.78412 3.51436 6.3459 2.75749 8.17317C2.00061 10.0004 1.80258 12.0111 2.18843 13.9509C2.57428 15.8907 3.52669 17.6725 4.92521 19.0711C6.32374 20.4696 8.10557 21.422 10.0454 21.8079C11.9852 22.1937 13.9959 21.9957 15.8231 21.2388C17.6504 20.4819 19.2122 19.2002 20.311 17.5557C21.4098 15.9112 21.9963 13.9778 21.9963 12C21.9963 10.6868 21.7377 9.38641 21.2351 8.17315C20.7326 6.95988 19.996 5.85748 19.0674 4.92889C18.1388 4.0003 17.0364 3.26371 15.8231 2.76117C14.6099 2.25863 13.3095 1.99998 11.9963 2Z"
					fill="currentColor"
				/>
				<path
					d="M15.561 16.972L11.003 12.414V6.004H13.003V11.586L16.975 15.558L15.561 16.972Z"
					fill="currentColor"
				/>
			</svg>

			{`${estimated}m`}
		</small>
	);
}
