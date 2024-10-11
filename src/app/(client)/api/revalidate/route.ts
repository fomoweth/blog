import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/env";

type WebhookPayload = {
	_type: string;
	slug?: string;
};

export async function POST(req: NextRequest) {
	try {
		const { body, isValidSignature } = await parseBody<WebhookPayload>(
			req,
			revalidateSecret,
		);

		if (!isValidSignature) {
			return new Response(
				JSON.stringify({
					message: "Invalid signature",
					isValidSignature,
					body,
				}),
				{ status: 401 },
			);
		}

		if (!body?._type) {
			return new Response(
				JSON.stringify({ message: "Bad Request", body }),
				{
					status: 400,
				},
			);
		}

		revalidateTag(body._type);

		if (body.slug) revalidateTag(`${body._type}:${body.slug}`);

		return NextResponse.json({
			status: 200,
			revalidated: true,
			now: Date.now(),
			body,
		});
	} catch (err) {
		console.error(err);
		return new Response((err as Error).message, { status: 500 });
	}
}
