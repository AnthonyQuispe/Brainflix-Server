const express = require("express");
const app = express();
const PORT = 8080;
const videoRoute = require("./routes/videos");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  next();
});

// This middleware allows us to serve static files
app.use("/public/images", express.static("./files"));

app.use("/videos", videoRoute);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
