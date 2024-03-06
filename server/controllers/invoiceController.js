const asyncHandler = require('express-async-handler');
const Invoice = require('../models/invoiceModel');
const User = require('../models/userModel');

// Create ------- Creates Invoice @ POST /api/invoices/
const createInvoice = async ( req, res) => {
    Invoice.createInvoice(
        req.body.name, 
        req.body.date, 
        req.body.notes, 
        req.body.price, 
        req.body.category,
        req.body.recurring,
        req.user
        )
    .then((purchase) => {
        res.status(201).json(purchase);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json({ error: "Creation of a purchase document failed, check your syntax." });
    });
};

// Retrieve ------------- Gets Invoices @ GET /api/invoices/
function invoiceFilter(req) {
    let filter = {...req.body};
    filter.user = req.user._id;
    return filter;
}

const getInvoices =  asyncHandler( async ( req, res) => {
    const filter = invoiceFilter(req);
    const result = await Invoice.findInvoice(filter);
    if (result.length !== 0) {
        res.send(result)
    } else {
        res.status(404).json({Error: "Invoice not found"})
    }
});

// Update ------------- Update Invoice @ PUT /api/invoices/:id
const updateInvoice = async (req, res) => {
    if (!req.user){
        res.status(401).json({Error: "User not found"})
    }
    const invoice = await Invoice.findById(req.params.id);

    if(invoice.user.toString() !== req.user._id.toString()) {
        res.status(401).json({Error: "User not authorized"})
    }

    if (invoice !== null) {
        const update = {...req.body};
        update.user = invoice.user
        const result = await Invoice.updateInvoices(req.params.id, update);

        if (result) {
            res.json(result)
        } else {
            res.status(404).json({Error: "Invoice not found"})
        }
    } else {
        res.status(404).json({ Error: "The document was not found, check id number" });
    }
};

// Delete ---------------- Delete Invoice @ DELETE /api/invoices/:id
const deleteInvoice = async (req, res) => {

    if (!req.user){
        res.status(401).json({Error: "User not found"})
    }
    const invoice = await Invoice.findById(req.params.id);

    if(invoice.user.toString() !== req.user._id.toString()) {
        res.status(401).json({Error: "User not authorized"})
    }

    await invoice.remove()

    res.status(200).json({ message: "invoice deleted", id: req.params.id })
};

module.exports = { createInvoice, getInvoices, updateInvoice, deleteInvoice};