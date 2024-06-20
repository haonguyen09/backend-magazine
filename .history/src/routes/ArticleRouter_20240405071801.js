const express = require("express");
const multer = require('multer');
const mammoth = require('mammoth');
const path = require('path'); // Make sure to require 'path'
const router = express.Router();
const articleController = require('../controllers/ArticleController');
// const { authMiddleWare } = require("../middleware/authMiddleware");

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
  }, articleController.createArticle);

router.put('/update/:id', articleController.updateArticle)
router.delete('/delete/:id', articleController.deleteArticle)
router.get('/get-all', articleController.getAllArticle)
router.get('/get-details/:id', articleController.getDetailsArticle)

module.exports = router
