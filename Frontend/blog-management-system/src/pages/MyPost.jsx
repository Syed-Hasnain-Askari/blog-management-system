import BlogPagination from "@/components/BlogPagination";
import Blogs from "@/components/ui/blogs";
import api from "@/utils/api";
import React, { useEffect, useState } from "react";

export default function MyPost() {
	const userId = JSON.parse(localStorage.getItem("user"))?.id;
	const [blog, setBlog] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await api.get(`/api/posts/user/${userId}`);
				setBlog(response.data.data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};
		fetchPosts();
	}, [userId]);
	return (
		<div className="w-full flex justify-center">
			<div className="max-w-6xl w-full px-4">
				<Blogs blog={blog} title="Blog Posts" />
				<div className="mt-3">
					<BlogPagination />
				</div>
			</div>
		</div>
	);
}
