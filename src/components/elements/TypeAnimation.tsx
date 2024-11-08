import { useMemo } from "react";
import { TypeAnimation as TA } from "react-type-animation";

interface Props extends Omit<React.ComponentProps<typeof TA>, "sequence"> {
	clear?: boolean;
	duration?: number;
	intro?: number;
	outro?: number;
	value: Array<string>;
}

type Sequence = Array<SequenceElement>;

type SequenceElement =
	| string
	| number
	| ((element: HTMLElement | null) => void | Promise<void>);

export default function TypeAnimation({
	className,
	clear = true,
	cursor = true,
	splitter,
	speed = 40,
	deletionSpeed = 40,
	duration = 3000,
	intro,
	outro,
	repeat = Infinity,
	style,
	value,
}: Props) {
	const sequence = useMemo(() => {
		const sequence = value.reduce<Sequence>(
			(acc, v) => acc.concat(v, duration),
			[],
		);

		if (intro && intro !== duration) {
			sequence.splice(0, 0, intro);
		}

		if (outro && outro !== duration) {
			sequence.splice(sequence.length - 1, 1, outro);
		}

		if (clear && value[value.length - 1]) {
			sequence.splice(sequence.length, 0, "");
			sequence.splice(sequence.length, 0, duration);
		}

		return sequence;
	}, [value, clear, duration, intro, outro]);

	return (
		<TA
			className={className}
			sequence={sequence}
			repeat={repeat}
			cursor={cursor}
			splitter={splitter}
			speed={speed}
			deletionSpeed={deletionSpeed}
			style={style}
		/>
	);
}
