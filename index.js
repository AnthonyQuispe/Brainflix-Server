const express = require("express");
const app = express();
const PORT = 8080;
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  next();
});

app.use("/", videoRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
