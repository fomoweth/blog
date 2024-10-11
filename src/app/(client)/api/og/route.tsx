import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

const interBold = fetch(
	new URL("../../../../../public/fonts/InterBold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const interExtraBold = fetch(
	new URL("../../../../../public/fonts/InterExtraBold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
	try {
		const [interBoldFont, interExtraBoldFont] = await Promise.all([
			interBold,
			interExtraBold,
		]);

		const { searchParams } = new URL(request.url);

		const title = searchParams.get("title")?.slice(0, 100) || "";

		return new ImageResponse(
			(
				<div tw="h-full w-full flex items-start justify-start bg-white">
					<div tw="flex items-start justify-start h-full">
						<img
							src={`https://cruip-tutorials-next.vercel.app/social-card-bg.jpg`}
							height={256}
							width={256}
							style={{ objectFit: "cover" }}
							tw="absolute inset-0 w-full h-full"
						/>
						<div tw="bg-black absolute inset-0 bg-opacity-60"></div>
						<div tw="flex items-center justify-center w-full h-full relative">
							<div tw="text-[80px] text-white font-bold text-center mx-20">
								{title}
							</div>
							<div tw="text-[80px] text-white font-extrabold text-center mx-20">
								{title}
							</div>
						</div>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Inter",
						data: interBoldFont,
						style: "normal",
						weight: 700,
					},
					{
						name: "Inter",
						data: interExtraBoldFont,
						style: "normal",
						weight: 800,
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
