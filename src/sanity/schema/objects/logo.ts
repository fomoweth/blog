import { defineField, defineType } from "sanity";
import { FaRegImages } from "react-icons/fa";

export default defineType({
	icon: FaRegImages,
	title: "Logo",
	name: "logo",
	type: "object",
	fields: [
		defineField({
			title: "Default",
			name: "default",
			type: "image",
			options: { hotspot: true },
		}),
		defineField({
			title: "Light",
			name: "light",
			type: "image",
			options: { hotspot: true },
		}),
		defineField({
			title: "Dark",
			name: "dark",
			type: "image",
			options: { hotspot: true },
		}),
	],
});
