import API from "../api/axios";

const checkAvailability = async (listingId, checkIn, checkOut) => {
  const response = await API.get(`/booking/availability/${listingId}`, {
    params: {
      checkIn,
      checkOut,
    },
  });

  return response.data;
};

const createBooking = async ({ listingId, checkIn, checkOut, guests }) => {
  const response = await API.post("/booking", {
    listingId,
    checkIn,
    checkOut,
    guests,
  });

  return response.data;
};

const getUserBookings = async ()=>{

  const response = await API.get("/booking/user-bookings");
  console.log("getUserBookings response : ", response?.data.bookings);
  return response.data.bookings;
}

const getHostBookings = async () => {
  const response = await API.get("/booking/host-bookings");
  return response.data.bookings;
};

const getHostBlockedDates = async () => {
  console.log("getHostBlockedDates called");
  const response = await API.get("/booking/host-blocked-dates");

  return response.data.blockedDates;
};

const blockHostDate = async (listingId, date) => {
  const response = await API.post("/booking/host-blocked-dates", {
    listingId,
    date,
  });
  return response.data.blockedDate;
};

const unblockHostDate = async (blockedDateId) => {
  const response = await API.delete(`/booking/host-blocked-dates/${blockedDateId}`);
  return response.data;
};

const getBookingById = async(bookingId) =>{
  const response = await API.get(`/booking/${bookingId}`);
  console.log("getBookingById response : ", response?.data.booking);
  return response.data.booking;
}

export {
    checkAvailability,
    createBooking ,
    getUserBookings,
    getHostBookings,
    getHostBlockedDates,
    blockHostDate,
    unblockHostDate,
    getBookingById
}