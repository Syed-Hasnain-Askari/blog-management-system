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

const Blogs = ({
	description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
	blog,
	title
}) => {
	const userId = JSON.parse(localStorage.getItem("user"))?.id;
	console.log(blog, "blog");
	console.log(blog[0]?.result?.id, "blog?.result?._id");
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
									{userId == post.result._id && (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<button className="p-2 rounded hover:bg-gray-100">
													<MoreVertical size={16} />
												</button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem>Edit</DropdownMenuItem>
												<AlertDialog>
													{/* This is the trigger in your dropdown */}
													<DropdownMenuItem>
														<AlertDialogTrigger>Delete</AlertDialogTrigger>
													</DropdownMenuItem>

													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>Are you sure?</AlertDialogTitle>
															<AlertDialogDescription>
																This action cannot be undone. This will
																permanently delete the post.
															</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>Cancel</AlertDialogCancel>
															<AlertDialogAction
																onClick={() => {
																	onDelete(); // call your delete function
																}}
															>
																Delete
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</DropdownMenuContent>
										</DropdownMenu>
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
