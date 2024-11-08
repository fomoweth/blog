import Img from "@/components/elements/Img";

interface Props {
	value: Sanity.Image;
}

export default function Image({ value }: Props) {
	const { caption, float } = value;

	return (
		<figure
			className="max-lg:full-bleed !mb-4 !mt-8 space-y-2 text-center md:![grid-column:bleed]"
			style={{ float }}
		>
			<Img
				className="mx-auto max-h-svh w-auto bg-background"
				source={value}
			/>

			{caption && (
				<figcaption className="mt-2 text-pretty text-center italic text-muted-foreground">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
