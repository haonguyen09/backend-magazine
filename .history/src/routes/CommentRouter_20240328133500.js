const express = require("express");
const router = express.Router();
const commentController = require('../controllers/CommentController');
// const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/create', commentController.createArticle)
router.put('/update/:id', commentController.updateArticle)
router.delete('/delete/:id', commentController.deleteArticle)
router.get('/get-all', commentController.getAllArticle)
router.get('/get-details/:id', commentController.getDetailsArticle)


module.exports = router