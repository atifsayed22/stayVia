const axios = require("axios");

const URL = "http://localhost:8080/booking";

const TOTAL_REQUESTS = 100


const listingId = "6a7c87442650e1ea52630b21";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTdjODgyZTVmODg0MDM0YTcxOTI2ZmMiLCJpYXQiOjE3ODY1NDc2ODAsImV4cCI6MTc4NzE1MjQ4MH0.jqDLqdeuwrNFJypPjVCbLGtnb_b5lpWa4iFTi0XoN5k";

const bookingData = {
  listingId,
  checkIn: "2026-11-10",
  checkOut: "2026-11-15",
  guests: 2,
};

async function sendBooking() {
  try {
    const response = await axios.post(URL, bookingData, {
      headers: {
         Cookie: `token=${token}`,
      },
    });

    return {
      success: true,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

async function runTest() {
  console.log(`Sending ${TOTAL_REQUESTS} simultaneous booking requests...`);

  const results = await Promise.all(
    Array.from(
      { length: TOTAL_REQUESTS },
      () => sendBooking()
    )
  );

  const successful = results.filter(
    (result) => result.success
  );

  const conflicts = results.filter(
    (result) => result.status === 409
  );

  const otherErrors = results.filter(
    (result) => !result.success && result.status !== 409
  );

  console.log("\n========== RESULTS ==========");
  console.log("Total requests:", TOTAL_REQUESTS);
  console.log("Successful:", successful.length);
  console.log("Conflicts:", conflicts.length);
  console.log("Other errors:", otherErrors.length);

  console.log("\nOther errors:");
  console.log(otherErrors);
}

runTest();