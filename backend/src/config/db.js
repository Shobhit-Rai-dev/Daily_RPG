const mongoose = require("mongoose");

async function connectDB() {
  const MONGODB_URI = "mongodb+srv://dailyrpg_user:skeHZuX2Hkw0dM9D@cluster0.xxxxx.mongodb.net/DailyRPG?retryWrites=true&w=majority";
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Copy .env.example to .env and fill it in.");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
}

module.exports = connectDB;
