"use client";

import { useState } from "react";
import { Prism } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Checked, Copy, File } from "@/components/icons";

import { cn } from "@/lib/utils";

interface Props {
	value?: Sanity.Code;
}

export default function Code({ value }: Props) {
	if (!value?.code) return null;

	const [isCopied, setIsCopied] = useState<boolean>(false);

	const handleClick = () => {
		if (typeof window === "undefined") return;

		navigator.clipboard.writeText(value.code).then(() => {
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2500);
		});
	};

	return (
		<div className="!my-10">
			<div className="group relative !mb-3 rounded-2xl bg-neutral-900">
				<div
					className={cn(
						"flex w-full gap-1.5 rounded-t-xl bg-neutral-950 p-3 lg:gap-x-2",
						"[&>div]:h-3 [&>div]:w-3 [&>div]:rounded-full",
					)}
				>
					<div className="bg-red-500" />
					<div className="bg-yellow-500" />
					<div className="bg-green-500" />
				</div>

				<div className="relative">
					<div className="h-9 w-full">
						<div className="inline-flex h-full items-center gap-x-2 border-b border-blue-500 bg-neutral-950/30 px-3 py-2 font-roboto-mono text-xs text-zinc-200 shadow-xl">
							<File size={16} />
							<span>{value.filename || value.language}</span>
						</div>
					</div>

					<Prism
						language={value.language}
						style={atomDark}
						customStyle={{ margin: 0 }}
						showLineNumbers
						wrapLines
						wrapLongLines
					>
						{value.code}
					</Prism>

					<button
						type="button"
						className="animate-fade-to-l absolute right-1 top-10 m-1 hidden rounded p-[.3em] text-lg text-zinc-200 hover:bg-zinc-200/10 active:scale-95 active:bg-zinc-200/20 group-hover:block"
						title={isCopied ? "Copied" : "Copy"}
						onClick={handleClick}
					>
						{isCopied ? <Checked /> : <Copy />}
					</button>
				</div>
			</div>
		</div>
	);
}
