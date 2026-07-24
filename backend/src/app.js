const express = require("express");
const cors = require("cors");
const contentRoutes = require("./routes/contentRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/content", contentRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CMS Backend Running",
  });
});

app.use("/api/auth", authRoutes);

module.exports = app;