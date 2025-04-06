import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type ProjectKey =
	| "title"
	| "description"
	| "duration"
	| "deployments"
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
		"deployments",
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
				"relative place-content-center overflow-hidden rounded-2xl bg-neutral-900 text-sm shadow-xl",
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

					{keys.map((key) => (
						<Block key={key} field={key} property={value} />
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
					<span>{field}: </span>
					<span className="text-teal-500">'{property[field]}'</span>
					<span>,</span>
				</span>
			);

		case "duration":
			const duration = property[field];
			return (
				<span className="ml-6 md:ml-10">
					<span>duration: &#123; start: </span>
					<span className="text-amber-300">'{duration.start}'</span>
					<span>, end: </span>
					<span className="text-amber-300">'{duration.end}'</span>
					<span> &#125;,</span>
				</span>
			);

		case "sourceCode":
			const sourceCode = property[field];
			return (
				<span className="ml-6 md:ml-10">
					<span>sourceCode: </span>
					{sourceCode ? (
						<Link
							className="text-sky-400 hover:underline hover:opacity-70"
							href={sourceCode}
							rel="noopener noreferrer"
							target="_blank"
						>
							'{sourceCode}'
						</Link>
					) : (
						<span className="text-sky-400">null</span>
					)}
					<span>,</span>
				</span>
			);

		case "stacks":
			const stacks = property[field];
			return (
				<span
					className={cn(
						"ml-6 flex md:ml-10",
						stacks.length < 5
							? "flex-row items-center"
							: "flex-col items-start",
					)}
				>
					<span>stacks: &#91;</span>
					{stacks.map((stack, idx) => (
						<span
							key={idx}
							className={cn(stacks.length < 5 ? "mx-1" : "mx-10")}
						>
							<span className="text-teal-500">'{stack}'</span>
							{idx < stacks.length - 1 && <span>,</span>}
						</span>
					))}
					<span>&#93;,</span>
				</span>
			);

		case "protocols":
			const protocols = property[field];
			if (!protocols) return;

			return (
				<span
					className={cn(
						"ml-6 flex md:ml-10",
						protocols.length < 5
							? "flex-row items-center"
							: "flex-col items-start",
					)}
				>
					<span>protocols: &#91;</span>
					{protocols.map(({ label, link }, idx) => (
						<span
							key={idx}
							className={cn(
								protocols.length < 5 ? "mx-1" : "mx-10",
							)}
						>
							<Link
								className="text-sky-400 hover:underline hover:opacity-70"
								href={link}
								rel="noopener noreferrer"
								target="_blank"
							>
								{label}
							</Link>
							{idx < protocols.length - 1 && <span>,</span>}
						</span>
					))}
					<span>&#93;,</span>
				</span>
			);

		case "bulletPoints":
			const bulletPoints = property[field];
			return (
				<span className="ml-6 flex flex-col items-start justify-center md:ml-10">
					<span>bulletPoints: &#91;</span>
					{bulletPoints.map((bulletPoint, idx) => (
						<span key={idx} className="ml-6 mr-5 md:ml-10">
							<span className="text-teal-500">
								'{bulletPoint}'
							</span>
							{idx < bulletPoints.length - 1 && <span>,</span>}
						</span>
					))}
					<span>&#93;,</span>
				</span>
			);

		case "deployments":
			const deployments = property[field];
			if (!deployments) return;

			return (
				<span className="ml-6 flex flex-col items-start md:ml-10">
					<span>deployments: &#91;</span>
					{deployments.map(({ address, addresses, label }, idx) => {
						if (addresses) {
							return (
								<span
									key={label}
									className={cn("ml-6 mr-5 md:ml-10")}
								>
									{addresses.map(
										(
											{
												chain: { chainId, etherscan },
												address,
											},
											i,
										) => (
											<span key={i} className={cn("")}>
												{i !== 0 && <br />}
												<span> &#123; </span>
												<br />
												<span className="ml-4 md:ml-8">
													name:{" "}
												</span>
												<span className="text-teal-500">
													'{label}'
												</span>
												<span>, </span>
												<br />
												<span className="ml-4 md:ml-8">
													chainId:{" "}
												</span>
												<span className="text-amber-300">
													'{chainId}'
												</span>
												<span>, </span>
												<br />
												<span className="ml-4 md:ml-8">
													address:{" "}
												</span>
												<Link
													className="text-sky-400 hover:underline hover:opacity-70"
													href={`${etherscan}/address/${address}`}
													rel="noopener noreferrer"
													target="_blank"
												>
													'{address}'
												</Link>
												<br />

												<span>
													&#125;
													{i <
														addresses.length -
															1 && <span>,</span>}
												</span>
											</span>
										),
									)}
								</span>
							);
						} else if (address) {
							return (
								<span
									key={label}
									className={cn("ml-6 mr-5 md:ml-10")}
								>
									<span> &#123; </span>
									<br />
									<span className="ml-6 md:ml-10">
										name:{" "}
									</span>
									<span className="text-teal-500">
										'{label}'
									</span>
									<span>, </span>
									<br />
									<span className="ml-6 md:ml-10">
										address:{" "}
									</span>
									<Link
										className="text-sky-400 hover:underline hover:opacity-70"
										href={`https://contractscan.xyz/contract/${address}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										'{address}'
									</Link>
									<br />
									<span>
										&#125;
										{idx < deployments.length - 1 && (
											<span>,</span>
										)}
									</span>
								</span>
							);
						}
					})}
					<span>&#93;,</span>
				</span>
			);
	}
}
