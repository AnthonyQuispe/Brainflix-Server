const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function readVideoFile() {
  const videosList = fs.readFileSync("./data/videos.json");
  const parsedData = JSON.parse(videosList);
  return parsedData;
}

router.get("/", (req, res) => {
  const videos = readVideoFile();
  res.json(videos);
});

// GET endpoint to get a specific video by ID
router.get("/:id", (req, res) => {
  const videoId = req.params.id;
  const videos = readVideoFile();
  const video = videos.find((v) => v.id === videoId);

  if (video) {
    res.json(video);
  } else {
    res.status(404).send("Video not found");
  }
});

// POST endpoint to add a video
router.post("/", (req, res) => {
  // Make a new video with a unique id
  console.log(req.body);
  const newVideos = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
  };

  // 1. Read the current video array
  // 2. Add to the video array
  // 3. Write the entire new video array to the file
  const videos = readVideoFile();
  videos.push(newVideos);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

  // Respond with the videos that was created
  res.status(201).json(newVideos);
});

module.exports = router;
