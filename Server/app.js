if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const connectDB = require("./config/db");
const listingRoutes = require("./routes/listingRoute");
const reviewRoutes = require("./routes/reviewRoute");
const userRoutes = require("./routes/userRoute");
const bookingRoutes = require('./routes/bookingRoutes')

const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

/* =========================
   Middlewares
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}))
/* =========================
   Routes
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StayVia Backend Running",
  });
});

app.use("/listing", listingRoutes);
app.use("/listing/:id/review", reviewRoutes);
app.use("/auth", userRoutes);
app.use("/booking", bookingRoutes);


/* =========================
   Error Handler
========================= */

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.log("some error occured") 
  console.log(err)

  res.status(status).json({
    success: false,
    message,
  });
});

/* =========================
   Start Server
========================= */

async function start() {
  try {
    await connectDB(MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();

module.exports = app;
