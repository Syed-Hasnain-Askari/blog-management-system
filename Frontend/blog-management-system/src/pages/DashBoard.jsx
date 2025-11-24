import { useState } from "react";
import Blogs from "../components/ui/blogs";
import StatsCards from "@/components/CardStats";
import { useEffect } from "react";
import api from "@/utils/api";
import Header from "@/components/Header";

export default function Dashboard() {
	const author = JSON.parse(localStorage.getItem("user"))?.role;
	const [blog, setBlog] = useState([]);
	const [stats, setStats] = useState({});
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [postsRes, statsRes] = await Promise.all([
					api.get("/api/posts/latest"),
					api.get("/api/admin/get-stats/")
				]);

				setBlog(postsRes.data.data);
				setStats(statsRes.data.stats);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
	const {
		totalUsers,
		totalUserPosts,
		totalPosts,
		totalDrafts,
		totalUserPublished
	} = stats;

	return (
		<div>
			<Header />
			{author === "admin" ? (
				<>
					<StatsCards
						title01={"Total Users"}
						description01={"Active accounts"}
						value01={totalUsers}
						title02={"Total Posts"}
						description02={"Published posts"}
						value02={totalPosts}
						title03={"Pending Reviews"}
						description03={"Awaiting approval"}
						value03={totalDrafts}
						stats={stats}
					/>
					<div className="w-full flex justify-center">
						<div className="max-w-6xl w-full px-4">
							<Blogs title={"Latest Blog"} blog={blog} />
						</div>
					</div>
				</>
			) : (
				<>
					<StatsCards
						title01={"Total Post"}
						description01={"Your posts"}
						value01={totalUserPosts}
						title02={"Published Posts"}
						description02={"Your Published posts"}
						value02={totalUserPublished}
						title03={"Draft Posts"}
						description03={"Your drafts"}
						value03={totalDrafts}
					/>
					<div className="w-full flex justify-center">
						<div className="max-w-6xl w-full px-4">
							<Blogs title={"Latest Blog"} blog={blog} />
						</div>
					</div>
				</>
			)}
		</div>
	);
}
