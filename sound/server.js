const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();


// Custom storage engine to rename the file with the correct extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const filename = `${Date.now()}${ext}`; // Create a unique filename with the extension
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });


//const upload = multer({ dest: 'public/uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/upload', upload.single('audio'), (req, res) => {
  const { title, tags, location, latitude, longitude, uploader } = req.body;
  const audioFile = req.file;

  if (!audioFile) {
    return res.status(400).send('Audio file is missing.');
  }

  // Parse  location
  const [city, country] = location.split(',').map(loc => loc.trim());

  // Create a new audio object
  const newAudio = {
    id: Date.now(),
    title,
    filePath: `${audioFile.filename }`,
    tags: tags+'' || [],
    location: { latitude,longitude,city, country },
    uploadDateTime: new Date().toISOString(),
    uploader,
    likes: 0,
    duration: "Unknown", // Optional: calculate duration with a library
    audioFormat: audioFile.mimetype.split('/')[1]
  };

  // Update the sounds.json file
  const filePath = 'public/sounds.json';
  const fileData = JSON.parse(fs.readFileSync(filePath));
  fileData.sounds.push(newAudio);

  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
  res.status(200).send('Audio uploaded successfully.');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));