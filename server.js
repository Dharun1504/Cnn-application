const express=require("express");
const app=express();
var path = require('path');
const fs=require('fs')
const allroute=require("./backend/routes/allroute")
require("./backend/connection/conn");
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/mp3Files', (req, res) => {
    const mp3Files = [];
  
    // Read files from the "public" directory
    const publicDir = path.join(__dirname, 'frontend\\public');
    fs.readdir(publicDir, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Filter only .mp3 files
      const mp3Files = files
        .filter(file => file.endsWith('.mp3'))
        .map(file => ({ url: file })); // Construct URL for each MP3 file

      res.json(mp3Files);
    });
  });

  app.get('/api/recommendmp3Files', (req, res) => {
    const recommendmp3Files = [];
  
    // Read files from the "public" directory
    const publicDir = path.join(__dirname, 'dl\\Music-Recommendation-Using-Deep-Learning\\Dataset\\Test_Music');
    fs.readdir(publicDir, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Filter only .mp3 files
      const recommendmp3Files = files
        .filter(file => file.endsWith('.mp3'))
        .map(file => ({ url: file })); // Construct URL for each MP3 file

      res.json(recommendmp3Files);
    });
  });
app.use("/api/v1",allroute);

const port = process.env.PORT || 8080
app.listen(port ,()=>{
    console.log("Server started",port);
});
