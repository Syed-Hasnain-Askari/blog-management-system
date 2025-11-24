import BlogPagination from "@/components/BlogPagination";
import Blogs from "@/components/ui/blogs";
import api from "@/utils/api";
import { useDebouncedCallback } from "use-debounce";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function AllPosts() {
	const [loading, setLoading] = useState(false);
	const [blogs, setBlogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const limit = 3;

	useEffect(() => {
		const fetchPosts = async (page) => {
			try {
				setLoading(true);
				const res = await api.get(`/api/posts?page=${page}&limit=${limit}`);
				if (res) {
					setLoading(false);
					setBlogs(res.data.data);
					setTotalPages(res.data.totalPages);
					setCurrentPage(res.data.currentPage);
				}
			} catch (err) {
				setLoading(false);
				console.error("Error fetching posts:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts(currentPage);
	}, []);
	const handlePageChange = async (page) => {
		try {
			setLoading(true);
			const res = await api.get(`/api/posts?page=${page}&limit=${limit}`);
			setBlogs(res.data.data);
			setTotalPages(res.data.totalPages);
			setCurrentPage(page);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleSearchChange = useDebouncedCallback(async (e) => {
		const search = e.target.value;
		setLoading(true);
		const res = await api.get(`/api/posts?search=${search}`);
		if (res) {
			setLoading(false);
			setBlogs(res.data.data);
		}
	}, 2000);

	console.log("Blogs:", blogs);
	return (
		<>
			<Header handleSearchChange={handleSearchChange} />
			{loading ? (
				<div className="w-full flex justify-center items-center">
					Loading...
				</div>
			) : (
				<div className="w-full flex justify-center">
					<div className="max-w-6xl w-full px-4">
						<Blogs title={"Blog Posts"} blog={blogs} />
						<div className="mt-5">
							{/* Pagination */}
							<BlogPagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
