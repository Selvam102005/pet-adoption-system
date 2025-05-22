const mongoose = require("mongoose");
const MONGO_URL = "mongodb://localhost:27017/myapp";
const connectDB = async () => {
  try {
    const con = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB is connected : ${con.connection.host}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;

