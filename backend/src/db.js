const mongoose = require("mongoose");

const uri = "mongodb://admin:password@127.0.0.1:27017/react-starter-test?authSource=admin";

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connection successful");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // ออกจากโปรเซส ถ้าเชื่อมไม่ติด
  }
}

module.exports = connectDB;
