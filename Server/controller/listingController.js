const Listing = require("../models/listing");

// ======================================
// Get All Listings
// ======================================
module.exports.getAllListings = async (req, res) => {
  const listings = await Listing.find({ status: "published" });

  return res.status(200).json({
    success: true,
    listings,
  });
};

// ======================================
// Get Listing By Id
// ======================================
module.exports.getListingById = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id).populate(
    "owner",
    "username email"
  );

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  return res.status(200).json({
    success: true,
    listing,
  });
};

// ======================================
// Get Logged In User Listings
// ======================================
module.exports.getMyListings = async (req, res) => {
  const listings = await Listing.find({
    owner: req.user._id,
  });

  return res.status(200).json({
    success: true,
    listings,
  });
};

// ======================================
// Create Listing
// ======================================
module.exports.createListing = async (req, res) => {
  const listing = new Listing({
    ...req.body,
    owner: req.user._id,
  });

  if (req.file) {
    listing.images.push({
      url: req.file.path,
      filename: req.file.filename,
    });
  }

  await listing.save();

  return res.status(201).json({
    success: true,
    message: "Listing created successfully",
    listing,
  });
};

// ======================================
// Update Listing
// ======================================
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  if (!listing.owner.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this listing",
    });
  }

  Object.assign(listing, req.body);

  if (req.file) {
    listing.images.push({
      url: req.file.path,
      filename: req.file.filename,
    });
  }

  await listing.save();

  return res.status(200).json({
    success: true,
    message: "Listing updated successfully",
    listing,
  });
};

// ======================================
// Delete Listing
// ======================================
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  if (!listing.owner.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this listing",
    });
  }

  await Listing.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Listing deleted successfully",
  });
};