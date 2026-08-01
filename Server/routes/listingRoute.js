const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

const protect = require("../middleware/auth");
const wrapAsync = require("../utils/wrapAsync");
const listing = require("../controller/listingController");

// Public Routes
router.get("/", wrapAsync(listing.getAllListings));

router.get("/my", protect, wrapAsync(listing.getMyListings));

router.get("/:id", wrapAsync(listing.getListingById));

// Protected Routes
router.post(
  "/",
  protect,
  upload.single("images"),
  wrapAsync(listing.createListing)
);

router.put(
  "/:id",
  protect,
  upload.single("images"),
  wrapAsync(listing.updateListing)
);

router.delete(
  "/:id",
  protect,
  wrapAsync(listing.deleteListing)
);

module.exports = router;