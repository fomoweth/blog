import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type ProjectKey =
	| "title"
	| "description"
	| "duration"
	| "sourceCode"
	| "stacks"
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
		"stacks",
		"protocols",
		"bulletPoints",
	],
	value,
	...props
}: Props) {
	return (
		<motion.div
			id={value.slug.current}
			className={cn(
				"relative place-content-center overflow-hidden rounded-2xl bg-neutral-900 shadow-xl",
				className,
			)}
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

			<div className="relative space-y-2 p-2 text-primary-foreground md:p-5">
				<p className="flex flex-col justify-center md:mr-5">
					<span>
						<span className="text-teal-400 md:mr-2">&#126;</span>
						<span> &#123;</span>
					</span>

					{keys.map((key, idx) => (
						<Block key={idx} field={key} property={value} />
					))}

					<span className="ml-2 md:ml-4"> &#125; </span>
				</p>
			</div>
		</motion.div>
	);
}

function Block({
	field,
	property,
}: {
	field: ProjectKey;
	property: Sanity.Project;
}) {
	switch (field) {
		case "title":
		case "description":
			return (
				<span className="ml-6 md:ml-10">
					<span>{field}&#58;&#32;</span>
					<span className="text-teal-500">
						&apos;{property[field]}&apos;
					</span>
					<span>&sbquo;</span>
				</span>
			);

		case "duration":
			return (
				<span className="ml-6 md:ml-10">
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
				<span className="ml-6 md:ml-10">
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

		case "stacks":
			const stacks = property[field];
			if (!stacks) return;

			return (
				<span
					className={cn(
						"ml-6 flex md:ml-10",
						stacks.length < 3
							? "flex-row items-center"
							: "flex-col items-start",
					)}
				>
					<span>{field}&#58;&#32; &#91;</span>
					{stacks.map((stack, idx) => (
						<span
							key={idx}
							className={cn(stacks.length < 3 ? "mx-1" : "mx-10")}
						>
							<span className="text-teal-500">{stack}</span>
							{idx < stacks.length - 1 && <span>&sbquo;</span>}
						</span>
					))}
					<span>&#93;&sbquo;</span>
				</span>
			);

		case "protocols":
			const protocols = property[field];
			if (!protocols) return;

			return (
				<span
					className={cn(
						"ml-6 flex md:ml-10",
						protocols.length < 3
							? "flex-row items-center"
							: "flex-col items-start",
					)}
				>
					<span>{field}&#58;&#32; &#91;</span>
					{protocols.map((protocol, idx) => (
						<span
							key={idx}
							className={cn(
								protocols.length < 3 ? "mx-1" : "mx-10",
							)}
						>
							<Link
								className="text-sky-400 hover:underline hover:opacity-70"
								href={protocol.link}
								rel="noopener noreferrer"
								target="_blank"
							>
								{protocol.label}
							</Link>
							{idx < protocols.length - 1 && <span>&sbquo;</span>}
						</span>
					))}
					<span>&#93;&sbquo;</span>
				</span>
			);

		case "bulletPoints":
			return (
				<span className="ml-6 flex flex-col items-start justify-center md:ml-10">
					<span>{field}&#58;&#32; &#91;</span>
					{property[field].map((bulletPoint, idx) => (
						<span key={idx} className="ml-6 mr-5 md:ml-10">
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
