const jwt = require("jsonwebtoken");
const generateAccessToken = (user) => {
	console.log("Generating access token for user:", user); // Debug log
	return jwt.sign(
		{ id: user._id, role: user.role },
		process.env.JWT_SECRET,
		{ expiresIn: "15m" } // short expiry
	);
};

const generateRefreshToken = (user) => {
	return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: "7d"
	});
};

module.exports = {
	generateAccessToken,
	generateRefreshToken
};
