const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const apiRouter = require("./routes");

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRouter);

// Start server only if DB connects successfully
connectDB().then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
});