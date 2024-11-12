// index.js (formerly server.js)

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const checkInRoutes = require("./routes/checkInRoutes");

dotenv.config();
connectDB();

const app = express();

// Enable CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://odwh-check-in.netlify.app'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Default route for server availability check
app.get("/", (req, res) => res.send("API is running"));

// API routes
app.use("/api", checkInRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});

// Start server only if running locally (for development)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export `app` for Vercel deployment
module.exports = app;