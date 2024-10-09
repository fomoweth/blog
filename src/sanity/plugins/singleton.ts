import { definePlugin } from "sanity";

export default definePlugin<string[]>((types) => {
	return {
		name: "singleton",
		document: {
			newDocumentOptions: (prev, { creationContext }) => {
				return creationContext.type === "global"
					? prev.filter((item) => !types.includes(item.templateId))
					: prev;
			},

			actions: (prev, { schemaType }) => {
				return types.includes(schemaType)
					? prev.filter(({ action }) => action !== "duplicate")
					: prev;
			},
		},
	};
});
