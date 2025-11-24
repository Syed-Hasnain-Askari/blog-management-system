import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from "@/components/ui/pagination";

export default function BlogPagination({
	currentPage,
	totalPages,
	onPageChange
}) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // simpler way
	console.log("Pagination - Total Pages:", totalPages);
	return (
		<Pagination>
			<PaginationContent>
				{/* Previous Button */}
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={(e) => {
							e.preventDefault();
							if (currentPage > 1) onPageChange(currentPage - 1);
						}}
					/>
				</PaginationItem>

				{/* Page Numbers */}
				{pages.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							href="#"
							isActive={page === currentPage} // important for shadcn styling
							onClick={(e) => {
								e.preventDefault();
								onPageChange(page);
							}}
						>
							{page} {/* This is crucial — the number must be the child */}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* Ellipsis (optional) */}
				{totalPages > 5 && <PaginationEllipsis />}

				{/* Next Button */}
				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={(e) => {
							e.preventDefault();
							if (currentPage < totalPages) onPageChange(currentPage + 1);
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
