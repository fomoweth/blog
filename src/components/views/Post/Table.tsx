import {
	Table as TableWrapper,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Props {
	value?: Sanity.Table;
}

export default function Table({ value }: Props) {
	if (!value) return null;

	const [headers, ...rows] = value.schema.rows;

	return (
		<TableWrapper>
			<TableCaption>{value.caption}</TableCaption>
			<TableHeader>
				<TableRow>
					{headers.cells.map((cell, idx) => (
						<TableHead key={idx} className="capitalize">
							{cell}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.map(({ _key, cells }) => (
					<TableRow key={_key}>
						{cells.map((cell, idx) => (
							<TableCell key={idx}>{cell}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</TableWrapper>
	);
}
