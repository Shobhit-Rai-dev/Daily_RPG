require("dotenv").config();

const connectDB = require("./src/config/db");
const createApp = require("./src/app");

const PORT = process.env.PORT || 5000;

function printMongoHelp(err) {
  console.error("\n❌ Could not connect to MongoDB.");
  console.error(`   ${err.message}\n`);
  console.error("This almost always means no MongoDB server is actually running yet");
  console.error("at the MONGODB_URI in your .env file. Two ways to fix it:\n");
  console.error("  1) Easiest — MongoDB Atlas (free, no install):");
  console.error("     https://www.mongodb.com/atlas -> create a free cluster ->");
  console.error("     'Connect' -> 'Drivers' -> copy the connection string ->");
  console.error("     paste it as MONGODB_URI in backend/.env\n");
  console.error("  2) Local install (Windows):");
  console.error("     https://www.mongodb.com/try/download/community -> install ->");
  console.error("     make sure the 'MongoDB' service is running (services.msc,");
  console.error("     or run `net start MongoDB` as Administrator)\n");
  console.error("Then just save .env and this will pick it up on the next restart.\n");
}

async function start() {
  try {
    await connectDB();
  } catch (err) {
    printMongoHelp(err);
    process.exit(1);
  }

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Daily RPG backend listening on http://localhost:${PORT}`);
  });
}

start();
