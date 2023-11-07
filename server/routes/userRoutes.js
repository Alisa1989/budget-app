const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser} = require('../controllers/userController.js');


router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/getuser", getUser);


module.exports = router;