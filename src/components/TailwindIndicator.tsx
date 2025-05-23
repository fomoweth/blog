"use client";

export default function TailwindIndicator() {
	if (process.env.NODE_ENV === "production") return null;

	return (
		<div className="fixed bottom-12 left-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
			<div className="block sm:hidden">XS</div>
			<div className="hidden sm:block md:hidden">SM</div>
			<div className="hidden md:block lg:hidden">MD</div>
			<div className="hidden lg:block xl:hidden">LG</div>
			<div className="hidden xl:block 2xl:hidden">XL</div>
			<div className="hidden 2xl:block 3xl:hidden">2XL</div>
			<div className="hidden 3xl:block">3XL</div>
		</div>
	);
}
