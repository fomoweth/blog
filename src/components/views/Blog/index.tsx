"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import Collection from "@/components/global/Collection";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";

import { useCategoryStore } from "@/stores/category";

import Categories from "./Categories";

interface Props {
	categories: Array<Sanity.Category>;
	posts: Array<Sanity.Post>;
}

const POSTS_PER_LOAD = 9;

export default function Blog({ categories, posts }: Props) {
	const { category: selected, reset } = useCategoryStore();

	const [loaded, setLoaded] = useState<number>(POSTS_PER_LOAD);

	useEffect(() => reset(), [usePathname()]);

	useEffect(() => setLoaded(POSTS_PER_LOAD), [selected]);

	const filtered = useMemo(
		() =>
			selected !== "all"
				? posts.filter(
						({ category }) => category.slug.current === selected,
					)
				: posts,
		[posts, selected],
	);

	const collection = useMemo(
		() => filtered.slice(0, loaded),
		[filtered, loaded],
	);

	const handleClick = () => {
		setLoaded((prev) => Math.min(prev + POSTS_PER_LOAD, filtered.length));
	};

	return (
		<AppLayout className="w-screen space-y-10 pt-20 md:space-y-16">
			<Categories
				className="mt-5 flex max-w-screen-xl justify-center md:mt-10 md:justify-end md:pr-4"
				items={categories}
				total={posts.length}
			/>

			<Collection className="max-w-screen-xl px-4" items={collection} />

			{loaded < filtered.length ? (
				<div className="mx-auto flex max-w-screen-xl justify-center pb-10 md:pb-16">
					<Button onClick={handleClick}>Load More</Button>
				</div>
			) : (
				<div className="h-20 w-full" />
			)}
		</AppLayout>
	);
}
