multer = require("multer")
path = require("path")
// Set up multer to store files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
  
const upload = multer({ storage: storage });

const uploadController = require('../controllers/upload')
const express = require('express') 
const router = express.Router()
router.get('/upload', uploadController.uploadPage) 
router.route("/upload").post(upload.single("audio"), uploadController.uploadNow)
module.exports = router;