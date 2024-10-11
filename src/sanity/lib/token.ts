import "server-only";

import { experimental_taintUniqueValue } from "react";

export const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

if (!token) {
	throw new TypeError(
		"Missing environment variable: NEXT_PUBLIC_SANITY_API_READ_TOKEN",
	);
}

experimental_taintUniqueValue(
	"Do not pass the Sanity API read token to the client.",
	process,
	token,
);
