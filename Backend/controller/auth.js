const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(422).json({
				error: "Email and password are required."
			});
		}

		// Find user
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				message: "Invalid email or password"
			});
		}

		// Compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({
				message: "Invalid email or password"
			});
		}

		// Generate JWT token
		const token = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);
		res.status(200).json({
			message: "Login Successful",
			token,
			refreshToken,
			name: user.name,
			user: {
				id: user._id,
				email: user.email,
				role: user.role
			}
		});
	} catch (error) {
		console.error("Login Error:", error);
		res.status(500).json({
			message: "Something went wrong. Please try again later."
		});
	}
};

const signup = async (req, res) => {
	try {
		const { username, email, password, role } = req.body;
		console.log("Signup data:", { username, email, password, role });
		if (!username || !email || !password || !role) {
			return res.status(422).json({ error: "fields are required." });
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(422).json({ error: "Email already registered" });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		const data = await User.create({
			username,
			email,
			password: hashedPassword,
			role
		});

		res.status(201).json({
			message: "User created successfully",
			user: {
				id: data._id,
				username: data.username,
				email: data.email
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Something went wrong" });
	}
};

const refreshAccessToken = async (req, res) => {
	try {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			return res.status(400).json({ error: "Refresh token required" });
		}

		// Verify refresh token
		jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET,
			async (err, decoded) => {
				if (err) {
					return res
						.status(401)
						.json({ error: "Invalid or expired refresh token" });
				}

				// Find the user
				const user = await User.findById(decoded.id);
				if (!user) {
					return res.status(404).json({ error: "User not found" });
				}

				// Generate new access token
				const newAccessToken = generateAccessToken(user);

				return res.status(200).json({
					accessToken: newAccessToken
				});
			}
		);
	} catch (error) {
		console.error("Refresh token error:", error);
		res.status(500).json({ error: "Server error" });
	}
};

module.exports = {
	login,
	signup,
	refreshAccessToken
};
