const mongoose = require("mongoose");

let post = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: false
		},
		tags: {
			type: [String], // array of strings
			default: [] // default empty array
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		status: {
			type: String,
			enum: ["draft", "published"],
			required: true
		}
	},
	{
		timestamps: true // automatically adds createdAt and updatedAt
	}
);
module.exports = new mongoose.model("post", post);
