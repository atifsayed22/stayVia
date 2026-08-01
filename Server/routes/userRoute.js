const express = require("express");
const protect = require("../middleware/auth.js");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controller/user");

router.post("/signup", wrapAsync(userController.signup));

router.post("/login", wrapAsync(userController.login));

router.post("/logout", userController.logout);

router.get("/me", protect, userController.getCurrentUser);

module.exports = router;