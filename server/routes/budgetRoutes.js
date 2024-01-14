const express = require('express');
const router = express.Router();
const { createBudget, getBudgets, updateBudget } = require('../controllers/budgetController');
const {protect} = require('../middleware/authMiddleware.js');


router.post("/", protect, createBudget);
router.get("/", protect, getBudgets);
router.put("/:id", protect, updateBudget);

module.exports = router;