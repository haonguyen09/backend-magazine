const express = require("express");
const router = express.Router();
const articleController = require('../controllers/ArticleController');
// const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/create', articleController.createArticle)
router.put('/update/:id', articleController.updateArticle)
router.delete('/delete/:id', articleController.deleteArticle)
router.get('/get-all', articleController.getAllArticle)
router.get('/get-details/:id', articleController.getDetailsArticle)


module.exports = router