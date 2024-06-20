const express = require("express");
const router = express.Router();
const rateController = require('../controllers/RateController');
// const { authMiddleWare } = require("../middleware/authMiddleware");


router.post('/create', rateController.createRate)
router.put('/update/:id', rateController.updateRate)
router.delete('/delete/:id', rateController.deleteRate)
router.get('/get-all', rateController.getAllRate)
router.get('/get-details/:id', rateController.getDetailsRate)


module.exports = router