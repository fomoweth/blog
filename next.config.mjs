/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
			{
				protocol: "https",
				hostname: "source.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},
	experimental: {
		taint: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
