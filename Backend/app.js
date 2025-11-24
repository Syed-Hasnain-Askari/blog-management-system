const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

// Normal CORS middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

const auth = require("./routes/auth");
const post = require("./routes/post");
const stats = require("./routes/status");

// Manual CORS fix for Vercel serverless functions
app.use((req, res, next) => {
	res.setHeader(
		"Access-Control-Allow-Origin",
		"https://dashing-kitten-9ae511.netlify.app"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, DELETE"
	);

	if (req.method === "OPTIONS") {
		return res.status(200).end(); // important for preflight
	}

	next();
});
// Routes
// test endpoint
app.get("/test", (req, res) => {
	res.json({ message: "CORS works on Vercel! 🎉" });
});

app.use("/api/auth/", auth);
app.use("/api/", post);
app.use("/api/admin", stats);

module.exports = app;
