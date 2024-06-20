const express = require("express");
const router = express.Router();
const topicController = require('../controllers/TopicController');
// const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/login', topicController.loginUser)
router.post('/logout', topicController.logoutUser)
router.post('/create', topicController.createUser)
router.put('/update/:id', topicController.updateUser)
router.delete('/delete/:id', topicController.deleteUser)
router.get('/get-all', topicController.getAllUser)
router.get('/get-details/:id', topicController.getDetailsUser)


module.exports = router