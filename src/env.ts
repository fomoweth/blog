export const baseUrl = assertValue("BASE_URL", process.env.NEXT_PUBLIC_URL);

export const apiVersion = assertValue(
	"SANITY_API_VERSION",
	process.env.NEXT_PUBLIC_SANITY_API_VERSION,
);

export const dataset = assertValue(
	"SANITY_DATASET",
	process.env.NEXT_PUBLIC_SANITY_DATASET,
);

export const projectId = assertValue(
	"SANITY_PROJECT_ID",
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
);

export const readToken = assertValue(
	"SANITY_API_READ_TOKEN",
	process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
);

export const studioUrl = "/studio";

function assertValue<T>(key: string, value?: T): T {
	if (!value) {
		throw new TypeError(`Missing environment variable: ${key}`);
	}

	return value;
}
