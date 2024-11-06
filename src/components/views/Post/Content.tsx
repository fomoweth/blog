"use client";

import { PortableText, type PortableTextBlock } from "next-sanity";

import { cn, isExternal } from "@/lib/utils";

import Code from "./Code";
import Heading from "./Heading";
import Image from "./Image";

interface Props {
	value: Array<PortableTextBlock>;
}

export default function Content({ value }: Props) {
	return (
		<div
			className={cn(
				"portable-text relative mx-auto w-full space-y-[1em] px-4 py-14 md:px-12",
				"[&>:first-child]:!mt-0",
			)}
		>
			<PortableText
				components={{
					block: {
						h1: (node) => <Heading as="h1" {...node} />,
						h2: (node) => <Heading as="h2" {...node} />,
						h3: (node) => <Heading as="h3" {...node} />,
						h4: (node) => <Heading as="h4" {...node} />,
						h5: (node) => <Heading as="h5" {...node} />,
						h6: (node) => <Heading as="h6" {...node} />,
						blockquote: ({ children }) => (
							<blockquote className="border-l-2 pl-4">
								<p className="text-sm text-gray-500">
									{children}
								</p>
							</blockquote>
						),
					},
					marks: {
						link: ({ children, value }) => (
							<a
								href={value.href}
								{...(isExternal(value.href) && {
									target: "_blank",
									rel: "noopener noreferrer",
								})}
							>
								{children}
							</a>
						),
					},
					types: {
						code: Code,
						image: Image,
					},
				}}
				value={value}
			/>
		</div>
	);
}
