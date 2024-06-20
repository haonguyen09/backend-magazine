const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
// const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/create', userController.createUser)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/get-all', userController.getAllUser)
router.get('/get-details/:id', userController.getDetailsUser)


module.exports = router