const mongoose = require("mongoose");

const reservationSlotSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
},{timestamps: true});

reservationSlotSchema.index(
  {
    listing: 1,
    date: 1,
  },
  {
    unique: true,
  }
);


module.exports = mongoose.model(
  "ReservationSlot",
  reservationSlotSchema
);