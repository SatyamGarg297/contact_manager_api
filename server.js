const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const protect = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/contacts', protect, contactRoutes);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error", err));
