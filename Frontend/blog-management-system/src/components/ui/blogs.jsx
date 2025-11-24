import { ArrowRight, MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/components/ui/card";
import BlogPagination from "../BlogPagination";
import { Link } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import api from "@/utils/api";
import { toast } from "sonner";

const Blogs = ({
	description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
	blog,
	title
}) => {
	const role = JSON.parse(localStorage.getItem("user"))?.role;

	const handleDeleteManufacture = async (postId) => {
		try {
			console.log("Deleting post with ID:", postId);
			const response = api.delete(`/api/posts/${postId}/`);
			if (response) {
				toast.success("Post deleted successfully");
			}
			console.log("Post deleted successfully:", response.data);
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};
	return (
		<section>
			<div className="container flex flex-col items-center gap-16 lg:px-16">
				<div className="text-center mt-4">
					<h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
						{title}
					</h2>
					<p className="text-muted-foreground mb-8 md:text-base lg:max-w-2xl lg:text-lg">
						{description}
					</p>
				</div>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
					{blog.map((post) => {
						console.log(post?.result._id, "map post");
						return (
							<Card
								key={post.id}
								className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
							>
								<div className="aspect-16/9 w-full">
									<a
										target="_blank"
										className="fade-in transition-opacity duration-200 hover:opacity-70"
									>
										<img
											src={
												"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
											}
											alt={post.title}
											className="h-full w-full object-cover object-center"
										/>
									</a>
								</div>
								<CardHeader>
									<h3 className="text-lg font-semibold hover:underline md:text-xl">
										<a href={post.url} target="_blank">
											{post.title}
										</a>
									</h3>
									{/* Show dropdown only for owner */}
									{role === "admin" && (
										<div className="flex justify-end">
											<AlertDialog>
												<AlertDialogTrigger>
													<svg
														class="w-6 h-6 text-gray-800 dark:text-white rounded-lg bg-gray-200 dark:bg-gray-800 p-1 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all mr-2"
														aria-hidden="true"
														xmlns="http://www.w3.org/2000/svg"
														width="30"
														height="30"
														fill="none"
														viewBox="0 0 24 24"
													>
														<path
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
														/>
													</svg>
												</AlertDialogTrigger>
												<AlertDialogContent
													style={{ backgroundColor: "#ffffff" }}
												>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Are you absolutely sure?
														</AlertDialogTitle>
														<AlertDialogDescription>
															This action cannot be undone. This will
															permanently delete your account and remove your
															data from our servers.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => {
																handleDeleteManufacture(post._id);
															}}
														>
															Continue
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
											<Link to={`/edit-post/${post._id}`}>
												<svg
													class="w-6 h-6 text-gray-800 dark:text-white"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													fill="none"
													viewBox="0 0 24 24"
												>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
													/>
												</svg>
											</Link>
										</div>
									)}
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{post.content}</p>
								</CardContent>
								<CardFooter>
									<Link
										to={`/post-detail/${post._id}`}
										className="text-foreground flex items-center hover:underline"
									>
										Read more
										<ArrowRight className="ml-2 size-4" />
									</Link>
								</CardFooter>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
};
export default Blogs;
