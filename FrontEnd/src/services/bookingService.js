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


export {
    checkAvailability,
    createBooking
}