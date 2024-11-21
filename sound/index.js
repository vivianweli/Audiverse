const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;



// Configure Multer to store uploaded files in the 'uploads/' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Serve static frontend files from the 'public/' directory
app.use(express.static('public'));

// Endpoint to handle file uploads
app.post('/upload', upload.single('audio'), (req, res) => {
    console.log('File received:', req.file); // Log the file data
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.json({ filePath: `/uploads/${req.file.filename}` });
});


// Serve uploaded audio files
app.use('/uploads', express.static('uploads'));


// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
