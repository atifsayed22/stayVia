const axios = require("axios");
const { json } = require("express");
require('dotenv').config()

async function test() {
  try {
    console.log(process.env.GEOAPIFY_API_KEY)
    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/search",
      {
        params: {
          text: "Mumbai, Maharashtra, India",
          limit: 1,
          format : "json",
          apiKey: "c4e1013eb91b45f2897fcecfedfd7ce5",
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("CODE:", error.code);
    console.error("MESSAGE:", error.message);
  }
}

test();