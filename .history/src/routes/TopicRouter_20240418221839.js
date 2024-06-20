const express = require("express");
const router = express.Router();
const topicController = require('../controllers/TopicController');
// const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/create', topicController.createTopic)
router.put('/update/:id', topicController.updateTopic)
router.delete('/delete/:id', topicController.deleteTopic)
router.get('/get-all', topicController.getAllTopic)
router.get('/get-pagination', topicController.getPaginationTopic)
router.get('/get-details/:id', topicController.getDetailsTopic)


module.exports = router