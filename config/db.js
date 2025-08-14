const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);   
    } catch (err) {
        console.error("MongoDB connected error:", err);
        process.exit(1); // stop server if DB fails
    }
};

module.exports = connectDB;