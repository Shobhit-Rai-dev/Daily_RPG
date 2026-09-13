const mongoose = require("mongoose");
const dns = require("dns");

async function connectDB() {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Copy .env.example to .env and fill it in.");
  }
  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
}

module.exports = connectDB;
