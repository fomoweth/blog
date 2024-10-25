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
	className,
	month = "short",
	day,
	year,
	timeZone = "UTC",
	value,
}: Props) {
	if (!isDateString(value)) {
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
		<time
			className={cn("text-sm font-medium text-black/60", className)}
			dateTime={dateTime}
		>
			{formatted}
		</time>
	);
}
