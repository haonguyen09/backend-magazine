const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
// const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.post('/create', userController.createUser)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/get-all', userController.getAllUser)
router.get('/get-details/:id', userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)


module.exports = router