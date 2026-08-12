require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");

const listings = require("./listings");
const geocodeAddress = require("../utils/geocode");


const MONGO_URI = process.env.MONGO_URI;

const HOST_ID = new mongoose.Types.ObjectId(
  "6a6cbfe5978520aa6d8e0904"
);



const seedListings = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/stayvia");

    console.log("MongoDB connected");

    // Remove existing listings
    await Listing.deleteMany({});

    console.log("Existing listings removed");

    const preparedListings = [];

    for (const listingData of listings) {
      console.log(`Geocoding: ${listingData.title}`);

      const location = await geocodeAddress(
        listingData.address
      );

      if (!location) {
        console.log(
          `❌ Could not geocode: ${listingData.title}`
        );
        continue;
      }

      console.log(
        `✅ ${listingData.title}`
      );

      console.log(
        `Coordinates: ${location.coordinates}`
      );

      preparedListings.push({
        ...listingData,

        owner: HOST_ID,

        geometry: {
          type: "Point",
          coordinates: location.coordinates,
        },
      });
    }

    if (preparedListings.length === 0) {
      throw new Error(
        "No listings could be geocoded."
      );
    }

    const insertedListings =
      await Listing.insertMany(preparedListings);

    console.log(
      `✅ ${insertedListings.length} listings inserted`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedListings();