const mongoose = require("mongoose");
const Review = require("./review");

const listingSchema = new mongoose.Schema(
  {
    // ==========================
    // Basic Information
    // ==========================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ==========================
    // Images
    // ==========================
    images: [
      {
        url: String,
        filename: String,
      },
    ],

    // ==========================
    // Pricing
    // ==========================
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // ==========================
    // Location
    // ==========================
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      country: {
        type: String,
        required: true,
        trim: true,
      },
      postalCode: {
        type: String,
        trim: true,
      },
    },

    // Will be filled using Mapbox later
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
      
      },
      
    },

    // ==========================
    // Property Details
    // ==========================
    propertyType: {
      type: String,
      enum: [
        "Apartment",
        "House",
        "Villa",
        "Cabin",
        "Farmhouse",
        "Hotel",
        "Resort",
      ],
      required: true,
    },

    roomType: {
      type: String,
      enum: [
        "Entire Place",
        "Private Room",
        "Shared Room",
      ],
      default: "Entire Place",
    },

    maxGuests: {
      type: Number,
      default: 1,
      min: 1,
    },

    bedrooms: {
      type: Number,
      default: 1,
      min: 0,
    },

    beds: {
      type: Number,
      default: 1,
      min: 1,
    },

    bathrooms: {
      type: Number,
      default: 1,
      min: 1,
    },

    // ==========================
    // Amenities
    // ==========================
    amenities: [
      {
        type: String,
      },
    ],

    // ==========================
    // House Rules
    // ==========================
    houseRules: [
      {
        type: String,
      },
    ],

    // ==========================
    // Reviews Summary
    // ==========================
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    // ==========================
    // Listing Status
    // ==========================
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

listingSchema.index({
  geometry: "2dsphere",
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({
      listing: listing._id,
    });
  }
});

module.exports = mongoose.model("Listing", listingSchema);