import Link from "next/link";
import { motion } from "framer-motion";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn, truncate } from "@/lib/utils";

interface Props extends React.ComponentProps<typeof motion.div> {
	className: string;
	keys: Array<
		keyof Pick<
			Sanity.Project,
			| "deployments"
			| "duration"
			| "highlights"
			| "protocols"
			| "sourceCode"
			| "stacks"
			| "summary"
			| "title"
		>
	>;
	value: Sanity.Project;
}

export default function Terminal({ className, keys, value, ...props }: Props) {
	const isMobile = useIsMobile();

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
				<div className="flex flex-col justify-center md:mr-5">
					<p>
						<span className="mr-0.5 text-teal-400 md:mr-2">
							&#126;
						</span>
						<span> &#123;</span>
					</p>

					{keys.map((key) => (
						<Block
							key={key}
							property={key}
							project={value}
							isMobile={isMobile}
						/>
					))}

					<p className="ml-2 md:ml-4"> &#125; </p>
				</div>
			</div>
		</motion.div>
	);
}

function Block({
	property,
	project,
	isMobile,
}: {
	property: keyof Sanity.Project;
	project: Sanity.Project;
	isMobile: boolean;
}) {
	switch (property) {
		case "title":
		case "summary":
			return (
				<div className="ml-6 md:ml-10">
					<span>{property}: </span>
					<span className="text-teal-500">'{project[property]}'</span>
					,
				</div>
			);

		case "duration":
			const { start, end } = project.duration;
			return (
				<div className="ml-6 md:ml-10">
					<span>duration: &#123; start: </span>
					<span className="text-amber-300">'{start}'</span>
					<span>, end: </span>
					<span className="text-amber-300">'{end}'</span>
					<span> &#125;,</span>
				</div>
			);

		case "sourceCode":
			const sourceCode = project[property];
			return (
				<div className="ml-6 md:ml-10">
					<span>sourceCode: </span>
					{sourceCode ? (
						<Link
							className="text-sky-400 hover:underline hover:opacity-70"
							href={sourceCode}
							rel="noopener noreferrer"
							target="_blank"
						>
							'{sourceCode.replace("https://", "")}'
						</Link>
					) : (
						<span className="text-sky-400">null</span>
					)}
					<span>,</span>
				</div>
			);

		case "stacks":
			const stacks = project[property];
			if (!stacks.length) return;

			return (
				<div
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
				</div>
			);

		case "protocols":
			const protocols = project[property];
			if (!protocols || !protocols.length) return;

			return (
				<div
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
								protocols.length < 5 ? "mx-1" : "ml-6 md:ml-10",
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
				</div>
			);

		case "highlights":
			const highlights = project[property];
			if (!highlights || !highlights.length) return;

			return (
				<div className="ml-6 flex flex-col items-start justify-center md:ml-10">
					<span>highlights: &#91;</span>
					{highlights.map((bulletPoint, idx) => (
						<span key={idx} className="ml-6 mr-5 md:ml-10">
							<span className="text-teal-500">
								'{bulletPoint}'
							</span>
							{idx < highlights.length - 1 && <span>,</span>}
						</span>
					))}
					<span>&#93;,</span>
				</div>
			);

		case "deployments":
			const deployments = project[property];
			if (!deployments || !deployments.length) return;

			return (
				<div className="ml-6 flex flex-col items-start overflow-auto md:ml-10">
					<span>deployments: &#91;</span>
					{deployments.map(({ address, addresses, label }, idx) => (
						<div key={label} className="ml-6 w-full md:ml-10">
							<span> &#123; </span>
							<br />
							<span className="ml-6 md:ml-10">name: </span>
							<span className="text-teal-500">'{label}'</span>
							<span>, </span>
							<br />
							{address && (
								<>
									<span className="ml-6 md:ml-10">
										address:{" "}
									</span>
									<Link
										className="text-sky-400 hover:underline hover:opacity-70"
										href={`https://contractscan.xyz/contract/${address}`}
										rel="noopener noreferrer"
										target="_blank"
									>
										'
										{isMobile
											? truncate(address, 20)
											: address}
										'
									</Link>
									<br />
								</>
							)}
							{addresses && addresses.length && (
								<div className="ml-6 md:ml-10">
									<span>addresses: &#91;</span>
									<br />
									{addresses.map(
										(
											{
												address,
												chain: { chainId, etherscan },
											},
											i,
										) => (
											<div
												key={i}
												className="ml-6 md:ml-10"
											>
												<span> &#123; </span>
												<br />
												<span className="ml-6 md:ml-10">
													chainId:{" "}
												</span>
												<span className="text-amber-300">
													'{chainId}'
												</span>
												<span>, </span>
												<br />
												<span className="ml-6 md:ml-10">
													address:{" "}
												</span>
												<Link
													className="text-sky-400 hover:underline hover:opacity-70"
													href={`${etherscan}/address/${address}`}
													rel="noopener noreferrer"
													target="_blank"
												>
													'
													{isMobile
														? truncate(address, 16)
														: address}
													'
												</Link>
												<br />
												<span>
													&#125;
													{i <
														addresses.length -
															1 && <span>,</span>}
												</span>
											</div>
										),
									)}
									<span>&#93;</span>
								</div>
							)}
							<span>
								&#125;
								{idx < deployments.length - 1 && <span>,</span>}
							</span>
						</div>
					))}
					<span>&#93;,</span>
				</div>
			);

		default:
			return;
	}
}
