let mongoose = require("mongoose");

let user = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: false
	},
	role: {
		type: String,
		enum: ["admin", "author"],
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});
module.exports = new mongoose.model("user", user);
