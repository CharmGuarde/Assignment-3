const mongoose = require("mongoose"); // import mongoose package
require("dotenv").config(); // load environment variables from .env file

async function connectDB() { // async function to connect to MongoDB
    try { // try to connect
        await mongoose.connect(process.env.MONGO_URI); // connect using MONGO_URI from environment variables
        console.log("MongoDB Connected");
    } catch (error) { // catch any errors
        console.error("DB Connection Error:", error);
    }
}

module.exports = connectDB; // export the connectDB function
