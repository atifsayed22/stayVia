const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");
const listingController = require("../controller/listingController");

router.get(
    "/listing/host",
    protect,
    listingController.getMyListings
);

module.exports = router;