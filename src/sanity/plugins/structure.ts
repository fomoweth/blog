import type { BaseSchemaType } from "sanity";
import type { ListItemBuilder, StructureResolver } from "sanity/structure";

import { capitalize, pluralize } from "../lib/utils";

export default function structure(
	title: string,
	params: { id: string; flag?: boolean }[][],
): StructureResolver {
	return (S, ctx) => {
		const resolve = (
			schema: BaseSchemaType,
			flag?: boolean,
		): ListItemBuilder =>
			!!flag
				? S.listItem()
						.id(schema.name)
						.schemaType(schema.name)
						.title(schema.title || capitalize(schema.name))
						.icon(schema.icon)
						.child(
							S.editor()
								.id(schema.name)
								.schemaType(schema.name)
								.documentId(schema.name),
						)
				: S.documentTypeListItem(schema.name).title(
						pluralize(schema.title || capitalize(schema.name), 0),
					);

		return S.list()
			.title(title)
			.items([
				...params.flatMap((types) => [
					...types.flatMap(({ id, flag }) =>
						resolve(ctx.schema.get(id)!, flag),
					),
					S.divider(),
				]),
			]);
	};
}
