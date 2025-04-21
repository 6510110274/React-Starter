const mongoose = require("mongoose");
const appConfig = require("./config");// ถ้าใช้ commonjs อาจต้องแก้ export

const { host, port, username, password, database } = appConfig.dbConnectionInfo;
const uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connection successful");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
