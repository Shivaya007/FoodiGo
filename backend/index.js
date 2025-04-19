require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");

const app = express();
const port = 5000;

// ✅ Initialize MongoDB Connection
(async () => {
  try {
    await mongoDB();
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("🚨 MongoDB Connection Error:", error.message);
  }
})();

// ✅ Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend requests

// ✅ API Routes
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("🚀 Server is Running!");
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
