const express = require("express");
const router = express.Router();
const auth = require("../controller/auth");
router.post("/login", auth.login);
router.post("/signup", auth.signup);
router.post("/refresh", auth.refreshAccessToken);
// router.post("/admin-login", auth.adminLogin);
module.exports = router;
