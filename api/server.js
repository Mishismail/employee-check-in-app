const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const checkInRoutes = require('./routes/checkInRoutes');

dotenv.config();
connectDB();

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) with specific options
const corsOptions = {
  origin: [
    'http://localhost:3000', // Allow your local development frontend
    'https://odwh-check-in.netlify.app' // Allow your deployed frontend
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
  credentials: true, // Allow credentials if needed, such as cookies or authorization headers
  optionsSuccessStatus: 200 // Some legacy browsers (e.g., IE11) choke on 204
};

// Use CORS with the specified options
app.use(cors(corsOptions));

// Parse incoming JSON requests
app.use(express.json());

// Routes for check-ins
app.use('/api', checkInRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
