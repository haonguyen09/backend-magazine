const express = require("express");
const multer = require('multer');
const path = require('path'); // Make sure to require 'path'
const router = express.Router();
const articleController = require('../controllers/ArticleController');
// const { authMiddleWare } = require("../middleware/authMiddleware");

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Define storage for multer
const storage = multer.diskStorage({
    // Define where the uploaded files should be stored
    destination: function(req, file, cb) {
        // You can specify a folder here. Make sure the folder exists or you create it.
        cb(null, 'uploads/');
    },
    // Define how the files should be named
    filename: function(req, file, cb) {
        // Here, we prefix the original filename with the current timestamp to avoid name conflicts
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Apply multer middleware to your route
ArticleRouter.post('/create', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 }
]), articleController.createArticle);

// router.post('/create', articleController.createArticle)
router.put('/update/:id', articleController.updateArticle)
router.delete('/delete/:id', articleController.deleteArticle)
router.get('/get-all', articleController.getAllArticle)
router.get('/get-details/:id', articleController.getDetailsArticle)


module.exports = router