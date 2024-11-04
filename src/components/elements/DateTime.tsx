import { cn } from "@/lib/utils";

type Props = Pick<
	Intl.DateTimeFormatOptions,
	"month" | "day" | "year" | "timeZone"
> & {
	className?: string;
	detail?: boolean;
	value: string;
};

const isDateString = (value: any): boolean => {
	return !isNaN(Date.parse(value));
};

const getTimeDifference = (value: Date) => {
	const current = new Date().getTime();
	const target = value.getTime();
	const difference = Math.abs(current - target);
	const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

	if (daysAgo < 1) {
		return "Today";
	} else if (daysAgo < 7) {
		return `(${daysAgo}d ago)`;
	} else if (daysAgo < 30) {
		const weeksAgo = Math.floor(daysAgo / 7);
		return `(${weeksAgo}w ago)`;
	} else if (daysAgo < 365) {
		const monthsAgo = Math.floor(daysAgo / 30);
		return `(${monthsAgo}mo ago)`;
	} else {
		const yearsAgo = Math.floor(daysAgo / 365);
		return `(${yearsAgo}y ago)`;
	}
};

export default function DateTime({
	className,
	detail,
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
			className={cn(
				"text-sm font-medium text-primary-foreground",
				className,
			)}
			dateTime={dateTime}
		>
			{formatted} {detail && getTimeDifference(parsed)}
		</time>
	);
}
