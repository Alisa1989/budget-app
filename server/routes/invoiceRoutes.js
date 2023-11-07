const express = require('express');
const router = express.Router();
const { createInvoice, getInvoices, updateInvoice, deleteInvoice } = require('../controllers/invoiceController')

router.post("/", createInvoice);
router.get("/", getInvoices);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);

module.exports = router;