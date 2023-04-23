const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

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
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).send("Title and Description are required");
    return;
  }

  const now = new Date();
  const timestamp = now.toISOString();

  const newVideo = {
    id: uuidv4(),
    title,
    description,
    channel: "Lorem Ipsum",
    views: "10",
    likes: "20",
    duration: "4:20",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp,
    comments: [
      {
        id: uuidv4(),
        name: "Lorem Ipsum",
        likes: "20",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        timestamp,
      },
    ],
  };

  // Handle image upload
  if (req.files && req.files.image) {
    const imageFile = req.files.image;
    const imagePath = `http://localhost:8080/public/images/${newVideo.id}`;
    imageFile.mv(
      path.join(__dirname, `../public/images/${newVideo.id}`),
      (error) => {
        if (error) {
          console.log(error);
          res.status(500).send("Error writing image file");
          return;
        }
      }
    );
    newVideo.image = imagePath;
  }

  // Add the new video to the video array
  const videos = readVideoFile();
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

  // Respond with the new video
  res.status(201).json(newVideo);
});

module.exports = router;
