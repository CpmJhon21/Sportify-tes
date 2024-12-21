const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;

  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).send("Invalid YouTube URL");
  }

  const info = await ytdl.getInfo(videoURL);
  const title = info.videoDetails.title;

  res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);
  ytdl(videoURL, { filter: "audioonly", quality: "highestaudio" }).pipe(res);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
