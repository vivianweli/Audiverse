const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync('./data/sounds.json')); // Read the JSON file containing data
const tags = data.tags; // Extract the "tags" array for dynamic form population

// Handle sound upload
exports.uploadSound = function (req, res, next) {
    console.log(req.body)
    // Assuming you're using middleware like multer to handle file uploads
    const { title, location, uploader, tags: selectedTags, audioFormat, latitude, longitude } = req.body;

    // Save the uploaded file (using the multer file object, usually saved under 'req.file')
    // Example: Move the file from temp storage to your server's file system
    if (req.file) {
        const filePath = path.join(__dirname, 'uploads', req.file.originalname); // Define where to save the file
        fs.renameSync(req.file.path, filePath); // Move the file from temp to desired location
    }

    // Optionally, you might want to store the uploaded sound details into a database or JSON file
    const newSound = {
        title,
        location,
        uploader,
        tags: selectedTags || [],
        audioFormat,
        latitude,
        longitude,
        filePath: req.file ? path.join('/uploads', req.file.originalname) : ''
    };

    // Update sounds.json or database with the new sound
    data.sounds.push(newSound); // Assuming data.sounds is an array
    fs.writeFileSync('./data/sounds.json', JSON.stringify(data, null, 2)); // Save back the updated data to JSON

    // Send a response or redirect
    res.redirect('/'); // Redirect to the upload page after successful upload
};
