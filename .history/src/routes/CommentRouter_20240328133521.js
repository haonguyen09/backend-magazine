const express = require("express");
const router = express.Router();
const commentController = require('../controllers/CommentController');
// const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/create', commentController.createComment)
router.put('/update/:id', commentController.updateComment)
router.delete('/delete/:id', commentController.deleteComment)
router.get('/get-all', commentController.getAllComment)
router.get('/get-details/:id', commentController.getDetailsComment)


module.exports = router