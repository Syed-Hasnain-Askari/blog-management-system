const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 3977;
const DB = process.env.CONNECTION_STRING;

mongoose
	.connect(DB)
	.then(() => {
		console.log("MongoDB connected successfully!");

		app.use(cors());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		http.createServer(app).listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});
