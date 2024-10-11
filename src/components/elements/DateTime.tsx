import { cn } from "@/lib/utils";

type Props = Pick<
	Intl.DateTimeFormatOptions,
	"month" | "day" | "year" | "timeZone"
> & {
	className?: string;
	value: string;
};

const isDateString = (value: any): boolean => {
	return !isNaN(Date.parse(value));
};

export default function DateTime({
	className = "text-black/60 dark:text-white/60",
	month = "short",
	day,
	year = "numeric",
	timeZone = "UTC",
	value,
}: Props) {
	if (!value || !isDateString(value)) {
		return <span className={cn("capitalize", className)}>{value}</span>;
	}

	const parsed = new Date(value);

	parsed.setUTCHours(0, 0, 0);

	const dateTime = parsed.toISOString();

	const formatted = parsed.toLocaleDateString("en-US", {
		month,
		day,
		year,
		timeZone,
	});

	return (
		<time className={className} dateTime={dateTime}>
			{formatted}
		</time>
	);
}
