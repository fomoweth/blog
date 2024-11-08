import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { validatePreviewUrl } from "@sanity/preview-url-secret";

import client from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

export async function GET(request: NextRequest) {
	const { isValid, redirectTo = "/" } = await validatePreviewUrl(
		client.withConfig({ token }),
		request.url,
	);

	if (!isValid) {
		return new Response("Invalid secret", { status: 401 });
	}

	draftMode().enable();

	return NextResponse.redirect(new URL(redirectTo, request.url));
}
