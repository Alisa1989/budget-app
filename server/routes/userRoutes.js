const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser} = require('../controllers/userController.js');
const {protect} = require('../middleware/authMiddleware.js');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuser", protect, getUser);


module.exports = router;