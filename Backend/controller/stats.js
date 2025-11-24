const User = require("../models/user");
const Post = require("../models/post");

const getStats = async (req, res) => {
	try {
		const totalUsers = await User.countDocuments();
		const totalPosts = await Post.countDocuments();
		const totalDrafts = await Post.countDocuments({ status: "draft" });
		const totalPublished = await Post.countDocuments({
			status: "published"
		});
		const totalUserPublished = await Post.countDocuments({
			status: "published",
			user: req.user.id
		});
		const totalUserPosts = await Post.countDocuments({ user: req.user.id });

		console.log("Stats fetched:", { totalUsers, totalPosts, totalDrafts });
		res.status(200).json({
			success: true,
			stats: {
				totalUsers,
				totalPosts,
				totalDrafts,
				totalUserPosts,
				totalUserPublished,
				totalPublished
			}
		});
	} catch (error) {
		console.error("Stats Error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch stats"
		});
	}
};
module.exports = {
	getStats
};
