const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const notificationRoutes = require("./routes/notifications");
const { connectRabbitMQ } = require('./rabbitmq');
const cors = require('cors');


connectRabbitMQ();

require('dotenv').config();

const app = express();
app.use(cors());

// ✅ Apply JSON parser globally
app.use(express.json());

// ✅ DB connection
connectDB();

// ✅ Mount notification routes at "/notifications"
app.use("/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
