const express = require("express");
const multer = require('multer');
const path = require('path'); // Make sure to require 'path'
const router = express.Router();
const articleController = require('../controllers/ArticleController');
// const { authMiddleWare } = require("../middleware/authMiddleware");

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

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