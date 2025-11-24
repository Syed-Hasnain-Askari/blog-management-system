import { format } from "date-fns";
import { Lightbulb } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function BlogDetails() {
	const [loading, setLoading] = useState(false);
	const params = useParams();
	const [blogDetail, setBlogDetail] = useState({});
	console.log("blogDetail:", blogDetail);

	useEffect(() => {
		// Fetch blog post details using params.id
		const fetchPostDetails = async () => {
			setLoading(true);
			try {
				// Replace with your API call
				const response = await api.get(`/api/posts/${params.id}`);
				if (response && response.data) {
					setLoading(false);
					setBlogDetail(response.data);
				}
			} catch (error) {
				setLoading(false);
				console.error("Error fetching post details:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchPostDetails();
	}, [params.id]);
	return (
		<>
			{loading ? (
				<p>loading...</p>
			) : (
				<section className="py-10">
					<div className="container">
						<div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
							<h1 className="max-w-3xl text-pretty text-5xl font-semibold md:text-6xl">
								{blogDetail[0]?.title}
							</h1>

							<div className="flex items-center gap-3 text-sm md:text-base">
								<Avatar className="h-8 w-8 border">
									<AvatarImage
										src={
											"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp"
										}
									/>
									<AvatarFallback>
										{blogDetail[0]?.user?.username || "Unknown Author"}
									</AvatarFallback>
								</Avatar>
								<span>
									<a href="#" className="font-semibold">
										{blogDetail[0]?.user?.username || "Unknown Author"}
									</a>
									<span className="ml-1">
										on {moment(blogDetail[0]?.createdAt).format("MMMM D, YYYY")}
									</span>
								</span>
							</div>
							<img
								src={
									"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
								}
								alt="placeholder"
								className="mb-8 mt-4 aspect-video w-full rounded-lg border object-cover"
							/>
						</div>
					</div>
					<div className="container">
						<div className="prose dark:prose-invert mx-auto max-w-3xl">
							<p className="text-muted-foreground mt-2 text-lg">
								{blogDetail[0]?.content}
							</p>
						</div>
					</div>
					<div className="flex flex-wrap gap-2 mt-6 justify-center container mx-auto">
						<span className="mt-2">
							<Label>Tags:</Label>
						</span>
						{blogDetail[0]?.tags.map((tag, index) => (
							<Badge
								key={index}
								variant="outline"
								className="rounded-full px-3 py-1 text-sm capitalize"
							>
								{tag}
							</Badge>
						))}
					</div>
				</section>
			)}
		</>
	);
}
