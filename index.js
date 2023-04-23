const express = require("express");
const app = express();
const PORT = 8080;
const videoRoute = require("./routes/videos");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(fileUpload()); // Add this middleware for handling file uploads

app.use((req, res, next) => {
  next();
});

// This middleware allows us to serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/videos", videoRoute);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
