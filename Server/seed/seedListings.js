require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");

const listings = require("./listings");
// const geocodeAddress = require("../utils/geocode");


const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI: ", MONGO_URI);

const HOST_ID = new mongoose.Types.ObjectId(
  ""
);



const seedListings = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    // Remove existing listings
    await Listing.deleteMany({});

    console.log("Existing listings removed");

    const preparedListings = [];

    for (const listingData of listings) {
      

     

      

      preparedListings.push({
        ...listingData,

        owner: HOST_ID,

        
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