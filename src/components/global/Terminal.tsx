import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type ProjectKey =
	| "title"
	| "description"
	| "duration"
	| "sourceCode"
	| "protocols"
	| "bulletPoints";

interface Props extends React.ComponentProps<typeof motion.div> {
	className: string;
	keys?: Array<ProjectKey>;
	value: Sanity.Project;
}

export default function Terminal({
	className,
	keys = [
		"title",
		"description",
		"duration",
		"sourceCode",
		"protocols",
		"bulletPoints",
	],
	value,
	style,
	...props
}: Props) {
	return (
		<motion.div
			id={value.slug.current}
			className={cn(
				"shrink-0 place-content-center overflow-hidden rounded-2xl bg-neutral-900 shadow-xl",
				className,
			)}
			style={style}
			{...props}
		>
			<div
				className={cn(
					"flex w-full gap-1.5 bg-neutral-950 p-3 lg:gap-x-2",
					"[&>div]:h-3 [&>div]:w-3 [&>div]:rounded-full",
				)}
			>
				<div className="bg-red-500" />
				<div className="bg-yellow-500" />
				<div className="bg-green-500" />
			</div>

			<div className="space-y-2 p-5 text-slate-200">
				<p className="mr-5 flex flex-col justify-center">
					<span>
						<span className="mr-2 text-teal-400">&#126;</span>
						<span> &#123;</span>
					</span>

					{keys.map((key, idx) => (
						<Block key={idx} property={value} field={key} />
					))}

					<span className="ml-5"> &#125; </span>
				</p>
			</div>
		</motion.div>
	);
}

function Block({
	property,
	field,
}: {
	property: Sanity.Project;
	field: ProjectKey;
}) {
	switch (field) {
		case "title":
		case "description":
			return (
				<span className="ml-10">
					<span>{field}&#58;&#32;</span>
					<span className="text-teal-500">
						&apos;{property[field]}&apos;
					</span>
					<span>&sbquo;</span>
				</span>
			);

		case "duration":
			return (
				<span className="ml-10">
					<span>{field}&#58; &#123; start&#58; </span>
					<span className="text-amber-300">
						&apos;{property[field].start}&apos;
					</span>
					<span>&sbquo; end&#58; </span>
					<span className="text-amber-300">
						&apos;{property[field].end}&apos;
					</span>
					<span> &#125;&sbquo;</span>
				</span>
			);

		case "sourceCode":
			return (
				<span className="ml-10">
					<span>{field}&#58;&#32;</span>
					{property[field] ? (
						<Link
							className="text-sky-400 hover:underline hover:opacity-70"
							href={property[field]}
							rel="noopener noreferrer"
							target="_blank"
						>
							&apos;{property[field]}&apos;
						</Link>
					) : (
						<span className="text-sky-400">null</span>
					)}
					<span>&sbquo;</span>
				</span>
			);

		case "protocols":
			const length = property[field].length;

			return (
				<span
					className={cn(
						"ml-10 flex",
						length < 3
							? "flex-row items-center"
							: "flex-col items-start",
					)}
				>
					<span>{field}&#58;&#32; &#91;</span>
					{property[field].map((protocol, idx) => (
						<span
							key={idx}
							className={cn(length < 3 ? "mx-1" : "mx-10")}
						>
							<Link
								className="text-sky-400 hover:underline hover:opacity-70"
								href={protocol.link}
								rel="noopener noreferrer"
								target="_blank"
							>
								{protocol.label}
							</Link>
							{idx < length - 1 && <span>&sbquo;</span>}
						</span>
					))}
					<span>&#93;&sbquo;</span>
				</span>
			);

		case "bulletPoints":
			return (
				<span className="ml-10 flex flex-col items-start justify-center">
					<span>{field}&#58;&#32; &#91;</span>
					{property[field].map((bulletPoint, idx) => (
						<span key={idx} className="ml-10 mr-5">
							<span className="text-teal-500">
								&apos;{bulletPoint}&apos;
							</span>
							<span>&sbquo;</span>
						</span>
					))}
					<span>&#93;&sbquo;</span>
				</span>
			);
	}
}
