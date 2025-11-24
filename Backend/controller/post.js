const mongoose = require("mongoose");
const Post = require("../models/post");

const getAllPosts = async (req, res) => {
	try {
		const { search = "" } = req.query;
		let page = Number(req.query.page) || 1;
		let limit = Number(req.query.limit) || 10;
		let skip = (page - 1) * limit;

		const pipeline = [];

		// If search keyword provided → apply $search
		if (search.trim() !== "") {
			pipeline.push({
				$search: {
					index: "searchblog", // your Atlas Search index
					text: {
						query: search, // the search string
						path: "title" // only search in the "title" field
					}
				}
			});
		}

		// Lookup user details
		pipeline.push(
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "result"
				}
			},
			{ $unwind: "$result" },

			// Fields to return
			{
				$project: {
					title: 1,
					content: 1,
					tags: 1,
					createdAt: 1,
					"result.username": 1,
					"result._id": 1
				}
			},

			{ $sort: { createdAt: -1 } },

			{ $skip: skip },
			{ $limit: limit }
		);

		const totalCount = await Post.countDocuments();

		const data = await Post.aggregate(pipeline);

		res.status(200).json({
			message: "Posts fetched successfully",
			currentPage: page,
			limit,
			totalPosts: totalCount,
			totalPages: Math.ceil(totalCount / limit),
			data: data
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
};

const getPostsByUserId = async (req, res) => {
	const _id = req.params.id;
	console.log("User ID:", _id);
	try {
		const posts = await Post.aggregate([
			{
				$match: { user: new mongoose.Types.ObjectId(req.params.id) }
			},
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "result"
				}
			},

			{
				$unwind: {
					path: "$result"
				}
			},
			{
				$project: {
					title: 1,
					content: 1,
					tags: 1,
					createdAt: 1,
					"result.username": 1,
					"result._id": 1
				}
			},
			{
				$sort: { createdAt: -1 }
			}
		]);

		res.status(200).json({
			message: "Posts fetched successfully",
			data: posts
		});
		console.log("Posts by User ID:", posts);
	} catch (err) {
		console.error(err);
		return [];
	}
};
const getLatestPosts = async (req, res) => {
	try {
		const userId = req.user.id;
		const posts = await Post.aggregate([
			// Join with users collection
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "result"
				}
			},

			{
				$unwind: {
					path: "$result"
				}
			},
			{
				$project: {
					title: 1,
					content: 1,
					tags: 1,
					createdAt: 1,
					"result.username": 1
				}
			},
			{
				$sort: { createdAt: -1 }
			},
			{ $limit: 3 }
		]);
		console.log("Latest Posts:", posts);
		res.status(200).json({
			message: "Posts fetched successfully",
			data: posts
		});
	} catch (err) {
		console.error(err);
		return [];
	}
};

const getAllMyPosts = async (req, res) => {
	try {
		const userId = req.user.id;
		const posts = await Post.find({ user: userId });
		if (!posts) {
			return res.status(404).json({ message: "No posts found for this user." });
		}
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};
const getPostById = async (req, res) => {
	try {
		const blogId = req.params.id;
		console.log("Blog ID:", req.params);
		const posts = await Post.aggregate([
			// Join with users collection
			{
				$match: { _id: new mongoose.Types.ObjectId(blogId) }
			},
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "result"
				}
			},

			{
				$unwind: {
					path: "$result"
				}
			},
			{
				$project: {
					title: 1,
					content: 1,
					tags: 1,
					createdAt: 1,
					user: {
						username: "$result.username"
					}
				}
			},
			{
				$sort: { createdAt: -1 }
			}
		]);
		if (!posts) {
			return res.status(404).json({ message: "Blog not found" });
		}
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};
const createPost = async (req, res) => {
	try {
		const { title, content, tags, status, userId } = req.body;
		console.log(req.body, "body");
		if (!title || !content || !status || !tags || !userId) {
			res.status(422).json({ message: "All fields are required." });
		}
		const data = await Post.create({
			title,
			content,
			tags,
			status,
			user: userId
		});
		if (data) {
			res.status(201).json({ message: "Post created successfully", data });
		}
	} catch (error) {
		console.error("Error creating post:", error);
		res.status(500).json({ message: "Something went wrong." });
	}
};
module.exports = {
	getAllPosts,
	getPostsByUserId,
	getPostById,
	getAllMyPosts,
	createPost,
	getLatestPosts
};
