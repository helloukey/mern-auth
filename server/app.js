const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const myRoutes = require("./routes/myRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// middleware
const corsConfig = {
  origin: "https://ephemeral-lebkuchen-07412b.netlify.app",
  credentials: true,
};
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Routes Middleware
app.use(myRoutes);
