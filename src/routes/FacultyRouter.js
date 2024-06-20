const express = require("express");
const router = express.Router();
const facultyController = require('../controllers/FacultyController');
// const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/create', facultyController.createFaculty)
router.put('/update/:id', facultyController.updateFaculty)
router.delete('/delete/:id', facultyController.deleteFaculty)
router.get('/get-all', facultyController.getAllFaculty)
router.get('/get-details/:id', facultyController.getDetailsFaculty)


module.exports = router