import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Github, Google, LinkedIn, TG, X } from "@/components/icons";

import { cn } from "@/lib/utils";

interface Props {
	className: string;
	contacts: Array<Sanity.Contact>;
	paths: Array<{ href: string; label: string }>;
	title: string;
}

export default function MobileNavigation({
	className,
	contacts,
	paths,
	title,
}: Props) {
	const [active, setActive] = useState<boolean>(false);

	const items = useMemo(() => {
		return contacts.reduce<Array<Sanity.Contact & { icon: JSX.Element }>>(
			(acc, contact) => {
				const { href } = contact;

				if (!!URL.canParse(href)) {
					const url = new URL(href);

					if (url.protocol === "mailto:") {
						return acc.concat({ ...contact, icon: <Google /> });
					}

					switch (url.host) {
						case "github.com":
							return acc.concat({ ...contact, icon: <Github /> });

						case "linkedin.com":
							return acc.concat({
								...contact,
								icon: <LinkedIn />,
							});

						case "t.me":
							return acc.concat({ ...contact, icon: <TG /> });

						case "twitter.com":
						case "x.com":
							return acc.concat({ ...contact, icon: <X /> });
					}
				}

				return acc;
			},
			[],
		);
	}, [contacts]);

	return (
		<>
			<Toggle active={active} setActive={setActive} />

			<AnimatePresence>
				{active && (
					<nav className={className}>
						<NavLinks paths={paths} />
						<CallToActions contacts={items} title={title} />
					</nav>
				)}
			</AnimatePresence>
		</>
	);
}

function Toggle({
	active,
	setActive,
}: {
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<>
			<motion.div
				className="absolute right-4 top-4 z-10 inline-block rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-800/20 md:hidden"
				style={{ top: 16, right: 16 }}
				initial={false}
				animate={active ? "open" : "closed"}
				variants={{
					open: {
						width: "calc(100% - 32px)",
						height: "calc(100vh - 32px)",
						transition: {
							type: "spring",
							mass: 3,
							stiffness: 400,
							damping: 50,
						},
					},
					closed: {
						height: "48px",
						width: "48px",
						transition: {
							type: "spring",
							delay: 0.75,
							mass: 3,
							stiffness: 400,
							damping: 50,
						},
					},
				}}
			/>

			<motion.button
				className={cn(
					"group fixed right-4 top-4 z-50 h-12 w-12 bg-white/0 transition-all hover:bg-white/20 md:hidden",
					active ? "rounded-bl-xl rounded-tr-xl" : "rounded-xl",
					"[&>span]:absolute [&>span]:block [&>span]:h-1 [&>span]:bg-white",
				)}
				initial={false}
				animate={active ? "open" : "closed"}
				onClick={() => setActive((prev) => !prev)}
			>
				<motion.span
					className="w-10"
					style={{ y: "-50%", x: "-50%", left: "50%" }}
					variants={{
						open: {
							rotate: ["0deg", "0deg", "45deg"],
							top: ["35%", "50%", "50%"],
						},
						closed: {
							rotate: ["45deg", "0deg", "0deg"],
							top: ["50%", "50%", "35%"],
						},
					}}
				/>
				<motion.span
					className="w-10"
					style={{ x: "-50%", y: "-50%", top: "50%", left: "50%" }}
					variants={{
						open: {
							rotate: ["0deg", "0deg", "-45deg"],
						},
						closed: {
							rotate: ["-45deg", "0deg", "0deg"],
						},
					}}
				/>
				<motion.span
					className="w-5"
					style={{ x: "-50%", y: "50%" }}
					variants={{
						open: {
							rotate: ["0deg", "0deg", "45deg"],
							bottom: ["35%", "50%", "50%"],
							left: "50%",
						},
						closed: {
							rotate: ["45deg", "0deg", "0deg"],
							bottom: ["50%", "50%", "35%"],
							left: "calc(50% + 10px)",
						},
					}}
				/>
			</motion.button>
		</>
	);
}

function NavLinks({
	paths,
}: {
	paths: Array<{ href: string; label: string }>;
}) {
	return (
		<motion.div className="z-30 space-y-6 p-12 pl-4">
			{paths.map((path, idx) => (
				<motion.a
					key={idx}
					className="block text-5xl font-semibold text-blue-50 transition-colors hover:text-blue-400"
					href={path.href}
					initial={{ opacity: 0, y: -8 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							delay: 0.75 + idx * 0.125,
							duration: 0.5,
							ease: "easeInOut",
						},
					}}
					exit={{ opacity: 0, y: -8 }}
				>
					{path.label}.
				</motion.a>
			))}
		</motion.div>
	);
}

function CallToActions({
	contacts,
	title,
}: {
	contacts: Array<Sanity.Contact & { icon: JSX.Element }>;
	title: string;
}) {
	return (
		<>
			<nav className="absolute bottom-4 left-4 z-30 flex flex-col gap-6">
				{contacts.map(({ icon, href, label }, idx) => (
					<motion.a
						key={idx}
						className="text-white transition-colors hover:text-blue-300"
						href={href}
						rel="noopener noreferrer"
						target="_blank"
						title={label}
						initial={{ opacity: 0, y: -8 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								delay: 1 + idx * 0.125,
								duration: 0.5,
								ease: "easeInOut",
							},
						}}
						exit={{ opacity: 0, y: -8 }}
					>
						{icon}
					</motion.a>
				))}
			</nav>

			<motion.button
				className="absolute bottom-2 right-2 z-30 inline-flex items-center gap-2 rounded-full bg-blue-700 px-4 py-1 text-lg font-medium text-blue-200 transition-colors hover:bg-white hover:text-blue-600"
				initial={{ opacity: 0, y: 8 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: {
						delay: 1.125,
						duration: 0.5,
						ease: "easeInOut",
					},
				}}
				exit={{ opacity: 0, y: 8 }}
			>
				{title}
			</motion.button>
		</>
	);
}
