"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const auth = require("./routes/auth");
const post = require("./routes/post");
const stats = require("./routes/status");

const app = express();

// Middleware setup
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Custom middleware to set CORS headers
app.use((req, res, next) => {
	res.header(
		"Access-Control-Allow-Headers",
		"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

// Routes
app.use("/api/auth/", auth);
app.use("/api/", post);
app.use("/api/admin", stats);

module.exports = app;
