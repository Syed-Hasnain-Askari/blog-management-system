"use client";

import { useBlog } from "@/context/BlogContext";
import BlogPagination from "@/components/BlogPagination";
import Blogs from "@/components/ui/blogs";
import Header from "@/components/Header";
import { useDebouncedCallback } from "use-debounce";

export default function AllPosts() {
	const {
		blogs,
		loading,
		currentPage,
		totalPages,
		fetchPosts,
		handleSearchChange,
		setCurrentPage
	} = useBlog();
	return (
		<>
			<Header handleSearchChange={handleSearchChange} />

			<div className="w-full flex justify-center">
				<div className="max-w-6xl w-full px-4">
					{loading ? <p>Loading...</p> : <Blogs blog={blogs} />}

					{/* Pagination only when NOT searching */}
					{totalPages > 1 && (
						<BlogPagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={(page) => {
								setCurrentPage(page);
								fetchPosts(page);
							}}
						/>
					)}
				</div>
			</div>
		</>
	);
}
