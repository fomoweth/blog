import { useCallback, useMemo } from "react";
import {
	FieldMember,
	MemberField,
	ObjectInputProps,
	RenderFieldCallback,
} from "sanity";
import { ArrowRightIcon } from "@sanity/icons";
import { Box, Flex, Text } from "@sanity/ui";

export function DurationInput({
	members,
	renderInput,
	renderItem,
	renderPreview,
}: ObjectInputProps) {
	const fieldMembers = useMemo(
		() => members.filter(({ kind }) => kind === "field") as FieldMember[],
		[members],
	);

	const start = fieldMembers.find(({ name }) => name === "start");
	const end = fieldMembers.find(({ name }) => name === "end");

	const renderField: RenderFieldCallback = useCallback(
		(props) => props.children,
		[],
	);

	const renderProps = useMemo(
		() => ({ renderField, renderInput, renderItem, renderPreview }),
		[renderField, renderInput, renderItem, renderPreview],
	);

	return (
		<Flex align="center" gap={3}>
			<Box flex={1}>
				{start && <MemberField {...renderProps} member={start} />}
			</Box>
			<Box>
				<Text muted>
					<ArrowRightIcon />
				</Text>
			</Box>
			<Box flex={1}>
				{end && <MemberField {...renderProps} member={end} />}
			</Box>
		</Flex>
	);
}
