import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
} from "@/components/ui/pagination";

interface Props {
	className?: string;
	index: number;
	length: number;
	offset: number;
	range: number;
	setIndex: React.Dispatch<React.SetStateAction<number>>;
	variant?: "default" | "minimal";
}

export default function ({
	className,
	index,
	setIndex,
	length,
	offset,
	range,
	variant = "default",
}: Props) {
	const [pages, setPages] = useState<Array<number>>([]);

	if (range % 2 === 0) range++;

	const step = Math.floor((range - 1) / 2);
	const currentPage = index + 1;
	const lastPage = Math.ceil(length / offset);

	const isFirst = index === 0;
	const isLast = index === lastPage - 1;

	const getPages = (
		current: number,
		total: number,
		range: number,
	): Array<number> => {
		const step = Math.floor((range - 1) / 2);

		let offset = current - step;

		if (range >= total || offset <= 1) {
			return Array.from({ length: range }, (_, i) => i + 1);
		}

		const last = offset + range - 1;

		if (last > total) {
			offset -= last - total;
		}

		return Array.from({ length: range }, (_, i) => i + offset);
	};

	useEffect(() => {
		setPages(getPages(currentPage, lastPage, range));
	}, [currentPage, index, lastPage, length, range]);

	if ((isFirst && isLast) || !pages.length) return null;

	const onPrevious = () => setIndex(Math.max(0, index - 1));
	const onNext = () => setIndex(Math.min(lastPage - 1, index + 1));

	return (
		<Pagination className={className}>
			<PaginationContent>
				<PaginationItem>
					<Button
						className="gap-1 pl-2.5"
						disabled={isFirst}
						onClick={onPrevious}
					>
						<ChevronLeft className="h-4 w-4" />
						<span>Previous</span>
					</Button>
				</PaginationItem>

				{variant === "default" ? (
					<>
						{pages[0] !== 1 && (
							<PaginationItem>
								<Button
									size="icon"
									variant="ghost"
									onClick={() => setIndex(0)}
								>
									1
								</Button>
							</PaginationItem>
						)}

						{pages[0] > 2 && (
							<PaginationItem>
								<Button
									size="icon"
									variant="ghost"
									onClick={() =>
										setIndex(Math.max(0, index - step))
									}
								>
									<PaginationEllipsis />
								</Button>
							</PaginationItem>
						)}

						{pages.map((page, idx) => {
							const current = Math.max(0, page - 1);
							const isActive = current === index;

							return (
								<PaginationItem key={idx}>
									<Button
										aria-current={isActive && "page"}
										size="icon"
										variant={isActive ? "outline" : "ghost"}
										onClick={() => setIndex(current)}
									>
										{page}
									</Button>
								</PaginationItem>
							);
						})}

						{pages[range - 1] < lastPage - 1 && (
							<PaginationItem>
								<Button
									size="icon"
									variant="ghost"
									onClick={() =>
										setIndex(
											Math.min(
												lastPage - 2,
												index + step,
											),
										)
									}
								>
									<PaginationEllipsis />
								</Button>
							</PaginationItem>
						)}

						{pages[range - 1] < lastPage && (
							<PaginationItem>
								<Button
									size="icon"
									variant="ghost"
									onClick={() => setIndex(lastPage - 1)}
								>
									{lastPage}
								</Button>
							</PaginationItem>
						)}
					</>
				) : (
					<PaginationItem className="inline-flex items-center gap-2.5 px-4 py-2">
						<span>{currentPage}</span>
						<span>of</span>
						<span>{lastPage}</span>
					</PaginationItem>
				)}

				<PaginationItem>
					<Button
						className="gap-1 pr-2.5"
						disabled={isLast}
						onClick={onNext}
					>
						<span>Next</span>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
