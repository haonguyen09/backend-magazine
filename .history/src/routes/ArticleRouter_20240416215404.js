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


  router.get('/fetch-html/:id', (req, res) => {
    const htmlPath = req.docHtmlContentPath; // Get the path from somewhere; here it's just a placeholder

    fs.readFile(htmlPath, 'utf8', (err, htmlContent) => {
        if (err) {
            console.error('Failed to read HTML file:', err);
            return res.status(500).json({ message: 'Failed to load HTML content' });
        }
        res.send(htmlContent); // Send the HTML content as a response
    });
});


router.delete('/delete/:id', articleController.deleteArticle)
router.get('/get-all', articleController.getAllArticle)
router.get('/pagination', articleController.PaginationArticle)
router.get('/get-details/:id', articleController.getDetailsArticle)

module.exports = router
