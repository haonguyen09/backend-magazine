const express = require("express");
const multer = require('multer');
const path = require('path'); // Make sure to require 'path'
const router = express.Router();
const articleController = require('../controllers/ArticleController');
// const { authMiddleWare } = require("../middleware/authMiddleware");
const { docxToHtmlMiddleware } = require("../middleware/convertDocx");

const fs = require('fs');

// Define storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadsDir = path.join(__dirname, '../uploads/');
        // Check if the directory exists, if not create it
        if (!fs.existsSync(uploadsDir)){
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Apply multer middleware to your route
router.post('/create', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]), (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer error here
      res.status(500).json({ message: err.message });
    } else if (err) {
      // Handle other errors here
      res.status(500).json({ message: err.message });
    } else {
      // No errors, proceed to controller logic
      next();
    }
  }, docxToHtmlMiddleware ,articleController.createArticle);

  router.put('/update/:id', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]), (req, res, next) => {

    next(); // Proceed to the next middleware or controller
  }, (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer error here
      res.status(500).json({ message: err.message });
    } else if (err) {
      // Handle other errors here
      res.status(500).json({ message: err.message });
    } else {
      // No errors, proceed to controller logic
      next();
    }
  }, docxToHtmlMiddleware, articleController.updateArticle);


  router.get('/html/:filename', async (req, res) => {
    try {
        const { filename } = req.params; // Extract the filename from the request parameters
        const htmlDir = path.join(__dirname, '../html'); // Define the directory where HTML files are stored
        const filePath = path.join(htmlDir, filename); // Construct the full file path

        if (fs.existsSync(filePath)) {
            res.sendFile(filePath); // Send the file if it exists
        } else {
            res.status(404).json({ message: "HTML file not found" }); // Return a 404 error if the file does not exist
        }
    } catch (error) {
        console.error('Error serving HTML file:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.delete('/delete/:id', articleController.deleteArticle)
router.get('/get-all', articleController.getAllArticle)
router.get('/pagination', articleController.PaginationArticle)
router.get('/get-details/:id', articleController.getDetailsArticle)

module.exports = router
