const express = require("express");
const router = express.Router();
const imageController = require('../controllers/ImageController');
// const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/create', imageController.createImage)
router.put('/update/:id', imageController.updateImage)
router.delete('/delete/:id', imageController.deleteImage)
router.get('/get-all', imageController.getAllImage)
router.get('/get-details/:id', imageController.getDetailsImage)


module.exports = router