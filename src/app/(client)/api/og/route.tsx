import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

import siteConfig from "@/config";

export const runtime = "edge";

const interFont = fetch(
	new URL("../../../../../public/fonts/InterSemiBold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const orbiterFont = fetch(
	new URL(
		"../../../../../public/fonts/OrbiterDisplaySemiBold.otf",
		import.meta.url,
	),
).then((res) => res.arrayBuffer());

export async function GET(request: NextRequest) {
	try {
		const {
			nextUrl: { searchParams },
		} = request;

		const title = searchParams.get("title");
		const subtitle = searchParams.get("subtitle");
		const category = searchParams.get("category");

		const font = await (!!title ? interFont : orbiterFont);

		return new ImageResponse(
			(
				<div tw="relative flex h-full w-full flex-col items-center justify-center bg-gray-50">
					<div tw="relative flex w-full bg-gray-50">
						{title ? (
							<div tw="flex w-full flex-col items-center justify-center px-4 py-12">
								{category && (
									<div tw="flex w-[85%] items-start justify-start px-4">
										<div tw="flex rounded-full bg-[#0847F7] px-4 py-1">
											<span
												tw="text-xl"
												style={{ color: "#fff" }}
											>
												{category}
											</span>
										</div>
									</div>
								)}
								<h2
									tw="flex flex-col font-bold text-gray-900"
									style={{ textWrap: "pretty" }}
								>
									<span tw="mb-4 text-7xl">{title}</span>
									<span tw="ml-1 w-2/3 text-4xl text-[#0847F7]">
										{subtitle}
									</span>
								</h2>
							</div>
						) : (
							<div tw="flex w-full flex-col items-center justify-center px-4 py-12">
								<h2 tw="flex flex-col text-9xl font-bold text-gray-900">
									{siteConfig.title}
								</h2>
							</div>
						)}
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Inter",
						data: font,
						style: "normal",
						weight: 600,
					},
				],
			},
		);
	} catch (e: any) {
		console.log(`${e.message}`);

		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}
