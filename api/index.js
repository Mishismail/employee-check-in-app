const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const checkInRoutes = require("./routes/checkInRoutes");

dotenv.config();
connectDB();

const app = express();

// Enable CORS with correct origin and headers
// index.js (in your backend directory)
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://odwh-check-in.netlify.app/check-in' // Your deployed frontend URL
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Default route for server availability check
app.get("/", (req, res) => res.send("API is running"));

// API routes
app.use("/api", checkInRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export `app` for Vercel deployment
module.exports = app;