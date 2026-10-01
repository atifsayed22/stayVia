const mongoose = require("mongoose");

const blockedDateSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

blockedDateSchema.index({ listing: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("BlockedDate", blockedDateSchema);
