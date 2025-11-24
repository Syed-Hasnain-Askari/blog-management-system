const express = require("express");
const router = express.Router();
const stats = require("../controller/stats");
const verifyToken = require("../middleware/verifyToken");
router.get("/get-stats", verifyToken, stats.getStats);

// router.post("/admin-login", auth.adminLogin);
module.exports = router;
