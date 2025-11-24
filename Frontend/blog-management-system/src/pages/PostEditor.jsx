import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import api from "@/utils/api";
import { toast } from "sonner";

export default function PostEditor() {
	const userId = JSON.parse(localStorage.getItem("user"))?.id;
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tagInput, setTagInput] = useState("");
	const [tags, setTags] = useState([]);
	const [status, setStatus] = useState("published");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	function addTagFromInput() {
		const t = tagInput.trim();
		if (!t) return;
		if (!tags.includes(t)) setTags((s) => [...s, t]);
		setTagInput("");
	}

	function removeTag(tagToRemove) {
		setTags((s) => s.filter((t) => t !== tagToRemove));
	}

	const validate = () => {
		const newErrors = {};
		if (!title.trim()) newErrors.title = "Title is required";
		if (!content.trim()) newErrors.content = "Content is required";
		if (!tags || tags.length === 0) newErrors.tags = "Tags is required";
		if (!status.trim()) newErrors.status = "Status is required";

		setError(newErrors);

		return Object.keys(newErrors).length === 0;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		try {
			setLoading(true);
			const response = await api.post("/api/posts/", {
				title,
				content,
				tags,
				status,
				userId
			});
			if (response) {
				setLoading(false);
				toast.success("Post has been created!");
				setTitle("");
				setContent("");
				setTags([]);
				setStatus("published");
			}
		} catch (err) {
			setLoading(false);
			toast.error(error.response?.data?.message || "Something went wrong");
			console.error(err);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6 flex justify-center">
			<Card className="w-full max-w-3xl">
				<CardHeader>
					<CardTitle className="text-2xl">Create / Edit Post</CardTitle>
					<CardDescription>
						Title, rich content, tags and status.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form className="space-y-6">
						{/* Title */}
						<Field>
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Write a compelling title"
								className="mt-2"
							/>
							{error && (
								<FieldDescription className={cn("text-red-500")}>
									{error.title}
								</FieldDescription>
							)}
						</Field>

						{/* Content */}
						<Field>
							<Label htmlFor="content">Content</Label>
							{/* Replace this <Textarea> with a rich editor (TipTap / React Quill) later */}
							<Textarea
								id="content"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								placeholder="Write your post content here... (replace with TipTap for rich editing)"
								className="min-h-[220px] mt-2"
							/>
							{error && (
								<FieldDescription className={cn("text-red-500")}>
									{error.content}
								</FieldDescription>
							)}
						</Field>

						{/* Tags */}
						<Field>
							<Label>Tags</Label>

							<div className="flex gap-2 mt-2">
								<Input
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											addTagFromInput();
										} else if (e.key === ",") {
											e.preventDefault();
											addTagFromInput();
										}
									}}
									placeholder="Add a tag and press Enter"
								/>
								<Button type="button" onClick={addTagFromInput}>
									Add
								</Button>
								{error && (
									<FieldDescription className={cn("text-red-500")}>
										{error.tag}
									</FieldDescription>
								)}
							</div>

							<div className="mt-3 flex flex-wrap gap-2">
								{tags.length === 0 && (
									<p className="text-sm text-gray-500">No tags added</p>
								)}
								{tags.map((t) => (
									<div
										key={t}
										className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
									>
										<span>{t}</span>
										<button
											type="button"
											onClick={() => removeTag(t)}
											className="text-xs leading-none px-1 hover:text-red-600"
											aria-label={`Remove ${t}`}
										>
											×
										</button>
									</div>
								))}
							</div>
							{error && (
								<FieldDescription className={cn("text-red-500")}>
									{error.tags}
								</FieldDescription>
							)}
						</Field>

						{/* Status */}
						<Field>
							<Label>Status</Label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="w-full mt-2 border rounded-md p-2"
							>
								<option value="published">Published</option>
								<option value="draft">Draft</option>
							</select>
						</Field>

						{/* Error */}
						{/* {error && <p className="text-sm text-red-600">{error}</p>} */}

						{/* Actions */}
						<div className="flex gap-3">
							<Button
								variant={"outline"}
								type="button"
								className="flex-1"
								onClick={handleSubmit}
							>
								{/* {loading ? "Saving..." : "Save Post"} */}
								Save Post
							</Button>
							<Button type="button" variant="outline">
								Reset
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
