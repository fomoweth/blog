import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface CircleProps {
	className?: string;
	children?: React.ReactNode;
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(
	({ className, children }, ref) => (
		<div
			className={cn(
				"z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
				className,
			)}
			ref={ref}
		>
			{children}
		</div>
	),
);

Circle.displayName = "Circle";

export { Circle };
