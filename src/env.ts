export const baseUrl = assertValue(
	"NEXT_PUBLIC_BASE_URL",
	process.env.NEXT_PUBLIC_BASE_URL,
);

export const apiVersion = assertValue(
	"NEXT_PUBLIC_SANITY_API_VERSION",
	process.env.NEXT_PUBLIC_SANITY_API_VERSION,
);

export const dataset = assertValue(
	"NEXT_PUBLIC_SANITY_DATASET",
	process.env.NEXT_PUBLIC_SANITY_DATASET,
);

export const projectId = assertValue(
	"NEXT_PUBLIC_SANITY_PROJECT_ID",
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
);

export const readToken = assertValue(
	"NEXT_PUBLIC_SANITY_API_READ_TOKEN",
	process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
);

export const writeToken = assertValue(
	"NEXT_PUBLIC_SANITY_API_WRITE_TOKEN",
	process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN,
);

export const revalidateSecret = assertValue(
	"NEXT_PUBLIC_SANITY_REVALIDATE_SECRET",
	process.env.NEXT_PUBLIC_SANITY_REVALIDATE_SECRET,
);

export const studioUrl = "/studio";

function assertValue<T>(key: string, value?: T): T {
	if (!value) {
		throw new TypeError(`Missing environment variable: ${key}`);
	}

	return value;
}
