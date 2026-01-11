require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/profile", require("./routes/profile"));

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).send("API is healthy");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Me-API Playground Backend!");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Me-API Playground Backend!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
