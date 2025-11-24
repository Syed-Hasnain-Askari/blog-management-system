import { createContext, useContext, useState, useEffect } from "react";
import api from "@/utils/api";
import { useDebounce } from "use-debounce";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [blogs, setBlogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const limit = 3;

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

	useEffect(() => {
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

	const handleSearchChange = async (query) => {
		console.log("Searching for:", query.target.value);
		const search = query.target.value;
		if (!search || search.trim() === "") {
			return fetchPosts(1); // reset search → load all again
		}
		try {
			setLoading(true);
			const res = await api.get(`/api/posts?search=${search}`);
			setBlogs(res.data.data);
			setTotalPages(1); // Search usually doesn’t paginate
			setCurrentPage(1);
		} catch (error) {
			console.error("Search failed:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<BlogContext.Provider
			value={{
				blogs,
				loading,
				currentPage,
				totalPages,
				fetchPosts,
				handlePageChange,
				handleSearchChange,
				setCurrentPage
			}}
		>
			{children}
		</BlogContext.Provider>
	);
};

export const useBlog = () => useContext(BlogContext);
