const asyncHandler = require('express-async-handler');
const Invoice = require('../models/invoiceModel');
const User = require('../models/userModel');

// Create ------- Creates Invoice @ POST /api/invoices/
const createInvoice = async ( req, res) => {
    console.log("user in controller", req.user)
    console.log("body in controller", req.body)
    console.log("date in controller", req.body.date)
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
    // if (req.body._id !== undefined) {
    //     filter.id = req.body._id;
    // }
    // if (req.body.name !== undefined) {
    //     filter.name = req.body.name;
    // }
    // if (req.body.price !== undefined) {
    //     filter.price = req.body.price;
    // }
    // if (req.body.date !== undefined) {
    //     filter.date = req.body.date;
    // }
    // if (req.body.notes !== undefined) {
    //     filter.notes = req.body.notes;
    // }
    // if (req.body.category !== undefined) {
    //     filter.category = req.body.category;
    // }
    // if (req.body.recurring !== undefined) {
    //     filter.recurring = req.body.recurring;
    // }
    filter.user = req.user._id;
    return filter;
}

const getInvoices =  asyncHandler( async ( req, res) => {
    // console.log(req.body)
    // console.log("req.user", req.user)
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
    // console.log("params", req.params)
    // console.log("body", req.body)

    if (!req.user){
        res.status(401).json({Error: "User not found"})
    }
    // console.log("user in invoice update", user);

    const invoice = await Invoice.findById(req.params.id);

    console.log("should be equal", invoice);
    // console.log("shoudl be equal", invoice.user.toString(), " and ", user._id.toString())

    if(invoice.user.toString() !== req.user._id.toString()) {
        res.status(401).json({Error: "User not authorized"})
    }

    if (invoice !== null) {
        const update = {...req.body};
        // if (req.body.name !== undefined) {
        // update.name = req.body.name;
        // }
        // if (req.body.price !== undefined) {
        // update.price = req.body.price;
        // }
        // if (req.body.notes !== undefined) {
        // update.notes = req.body.notes;
        // }
        // if (req.body.date !== undefined) {
        // update.date = req.body.date;
        // }
        // if (req.body.category !== undefined) {
        // update.category = req.body.category;
        // }
        // if (req.body.recurring !== undefined) {                    
        // update.recurring = req.body.recurring;
        // }
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
    console.log("shoudl be equal", invoice);
    console.log("shoudl be equal user", invoice.user);
    // console.log("shoudl be equal", invoice.user.toString(), " and ", user._id)

    if(invoice.user.toString() !== req.user._id.toString()) {
        res.status(401).json({Error: "User not authorized"})
    }

    await invoice.remove()

    res.status(200).json({ message: "invoice deleted", id: req.params.id })
    // Invoice.deleteByID(req.params.id)
    // .then((deletedCount) => {
    //     if (deletedCount === 1) {
    //         res.status(204).json({ response: 'Purchase document deleted'});
    //     } else {
    //         res.status(404).json({ error: 'The purchase document was not found'})
    //     };
    // })
    // .catch((error) => {
    //     console.error(error);
    //     res.send({ error: "Request to delete by ID failed" });
    // });
};

module.exports = { createInvoice, getInvoices, updateInvoice, deleteInvoice};