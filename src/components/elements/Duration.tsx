import DateTime from "@/components/elements/DateTime";
import { cn } from "@/lib/utils";

type Props = Pick<Intl.DateTimeFormatOptions, "month" | "day" | "year"> & {
	className?: string;
	value: Sanity.Duration;
};

export default function Duration({
	className,
	month,
	day = "numeric",
	year = "numeric",
	value: { start, end },
}: Props) {
	return (
		<small
			className={cn(
				"text-sm text-black/60 dark:text-white/60",
				className,
			)}
		>
			<DateTime month={month} day={day} year={year} value={start} /> -{" "}
			<DateTime
				month={month}
				day={day}
				year={year}
				value={end || "Present"}
			/>
		</small>
	);
}
