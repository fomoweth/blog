"use client";

import { useMemo } from "react";
import { Cloud, ICloud, renderSimpleIcon } from "react-icon-cloud";

import { sluggify } from "@/lib/utils";

const cloudProps: Omit<ICloud, "children"> = {
	id: "stable-id-for-csr-ssr",
	canvasProps: {
		style: {
			width: "80%",
		},
	},
	containerProps: {
		style: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			paddingTop: 40,
		},
	},
	options: {
		reverse: true,
		depth: 1,
		wheelZoom: false,
		imageScale: 2,
		activeCursor: "pointer",
		tooltip: "native",
		initial: [0.1, -0.1],
		clickToFront: 500,
		tooltipDelay: 0,
		outlineColour: "#0000",
		maxSpeed: 0.03,
		minSpeed: 0.01,
	},
};

interface Props {
	items: Array<{ href?: string; label: string; src: string }>;
	size?: number;
}

export default function IconCloud({ items, size = 42 }: Props) {
	const icons = useMemo(() => {
		if (!items || !items.length) return null;

		return items.map(({ href, label, src }) =>
			renderSimpleIcon({
				icon: {
					slug: sluggify(label),
					path: "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z",
					hex: "#000000",
					title: label,
				},
				bgHex: "#F3F2EF",
				fallbackHex: "#6E6E73",
				minContrastRatio: 1.2,
				size,
				aProps: {
					href,
					alt: label,
					target: href && "_blank",
					rel: href && "noopener noreferrer",
					onClick: (e: any) => e.preventDefault(),
				},
				imgProps: {
					src,
					alt: label,
				},
			}),
		);
	}, [items, size]);

	return (
		// @ts-ignore
		<Cloud {...cloudProps}>
			<>{icons}</>
		</Cloud>
	);
}
