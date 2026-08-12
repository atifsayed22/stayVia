require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const axios = require("axios");

const geocodeAddress = async (address) => {
  console.log("Geo Api Key : ")
  console.log(process.env.GEOAPIFY_GEOCODING_API)
  const response = await axios.get(
    "https://api.geoapify.com/v1/geocode/search",

    {
      params: {
        street: address.street,
        city: address.city,
        state: address.state,
        postcode: address.postalCode,
        country: address.country,

        limit: 1,
        format: "json",
        apiKey: process.env.GEOAPIFY_GEOCODING_API,
      },
    },
  );

  console.log(response.data.results)

  const results = response.data.results;

  if (!results || results.length === 0) {

    return null;
  }
  const location = results[0];


  return {
    coordinates: [location.lon, location.lat],
    formatted: location.formatted,
    resultType: location.result_type,
    confidence: location.rank?.confidence,
  };
};

module.exports = geocodeAddress;
