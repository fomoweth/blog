import DateTime from "@/components/elements/DateTime";
import { cn } from "@/lib/utils";

type Props = Pick<Intl.DateTimeFormatOptions, "month" | "day" | "year"> & {
	className?: string;
	value: Sanity.Duration;
};

export default function Duration({
	className = "text-sm text-black/60 dark:text-white/60",
	month,
	day,
	year,
	value: { start, end },
}: Props) {
	return (
		<small className={className}>
			<DateTime
				className={className}
				month={month}
				day={day}
				year={year}
				value={start}
			/>
			<span> &ndash; </span>
			<DateTime
				className={className}
				month={month}
				day={day}
				year={year}
				value={end || "Present"}
			/>
		</small>
	);
}
