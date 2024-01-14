const express = require('express');
const router = express.Router();
const { createInvoice, getInvoices, updateInvoice, deleteInvoice } = require('../controllers/invoiceController')
const {protect} = require('../middleware/authMiddleware.js');


router.post("/", protect, createInvoice);
router.get("/", protect, getInvoices);
router.put("/:id", protect, updateInvoice);
router.delete("/:id", protect, deleteInvoice);

module.exports = router;