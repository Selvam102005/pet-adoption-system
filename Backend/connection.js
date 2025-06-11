const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://selvam:Mallika%40102005@cluster-1.nvjoxzk.mongodb.net/";
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

