const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const apiRouter = require("./routes");
const { initSsoCert } = require("./auth");

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRouter);

// Start server only if DB connects successfully
(async () => {
  try {
    await connectDB();
    await initSsoCert(); // Initialize SSO certificate if needed
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
})();