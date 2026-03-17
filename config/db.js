const mongoose = require("mongoose");
const config = require("config");
const db = process.env.MONGO_URI || config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
