const Listing = require("../models/listing");
const geocodeAddress = require("../utils/geocode");

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
    "username email",
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
  const location = await geocodeAddress(req.body.address);

  if (!location) {
    return res.status(400).json({
      success: false,
      message: "Unable to verify the provided address.",
    });
  }

  const listing = new Listing({
    ...req.body,

    owner: req.user._id,

    geometry: {
      type: "Point",
      coordinates: location.coordinates,
    },
  });



  if (req.files && req.files.length > 0) {
    listing.images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    console.log("created listing data with images");
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

  const addressChanged =
    req.body.address?.street !== listing.address?.street ||
    req.body.address?.city !== listing.address?.city ||
    req.body.address?.state !== listing.address?.state ||
    req.body.address?.country !== listing.address?.country ||
    req.body.address?.postalCode !== listing.address?.postalCode;

  Object.assign(listing, req.body);

  if (addressChanged) {
    console.log("Addres Changed")
    const location = await geocodeAddress(req.body.address);

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Unable to verify the provided address.",
      });
    }

    listing.geometry = {
      type: "Point",
      coordinates: location.coordinates,
    };
  }


  let existingImages = [];

  if (req.body.existingImages) {
    existingImages = JSON.parse(req.body.existingImages);
  }

  // -------------------------
  // Newly Uploaded Images
  // -------------------------

  const newImages =
    req.files && req.files.length > 0
      ? req.files.map((file) => ({
          url: file.path,
          filename: file.filename,
        }))
      : [];

  // -------------------------
  // Final Images
  // -------------------------

  listing.images = [...existingImages, ...newImages];

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
