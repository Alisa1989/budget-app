const asyncHandler = require('express-async-handler');
const invoices = require('../models/invoiceModel');



// Create ------- Creates Invoice @ POST /api/invoices/
const createInvoice = async ( req, res) => {
    invoices.createInvoice(
        req.body.name, 
        req.body.date.slice(0,10), 
        req.body.notes, 
        req.body.price, 
        req.body.category,
        req.body.recurring
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
    let filter = {};
    if (req.body._id !== undefined) {
        filter.id = req.body._id;
    }
    if (req.body.name !== undefined) {
        filter.name = req.body.name;
    }
    if (req.body.price !== undefined) {
        filter.price = req.body.price;
    }
    if (req.body.date !== undefined) {
        filter.date = req.body.date;
    }
    if (req.body.notes !== undefined) {
        filter.notes = req.body.notes;
    }
    if (req.body.category !== undefined) {
        filter.category = req.body.category;
    }
    if (req.body.recurring !== undefined) {
        filter.recurring = req.body.recurring;
    }
    return filter;
}

const getInvoices =  asyncHandler( async ( req, res) => {
    // console.log(req.body)
    const filter = invoiceFilter(req);
    const result = await invoices.findInvoice(filter);
    if (result.length !== 0) {
        res.send(result)
    } else {
        res.status(404).json({Error: "Invoice not found"})
    }
});

// Update ------------- Update Invoice @ PUT /api/invoices/:id
const updateInvoice = async (req, res) => {
    console.log("params", req.params)
    console.log("body", req.body)
    const invoice = await invoices.findById(req.params.id);
    if (invoice !== null) {
        const update = {};
        if (req.body.name !== undefined) {
        update.name = req.body.name;
        }
        if (req.body.price !== undefined) {
        update.price = req.body.price;
        }
        if (req.body.notes !== undefined) {
        update.notes = req.body.notes;
        }
        if (req.body.date !== undefined) {
        update.date = req.body.date;
        }
        if (req.body.category !== undefined) {
        update.category = req.body.category;
        }
        if (req.body.recurring !== undefined) {                    
        update.recurring = req.body.recurring;
        }
        const result = await invoices.updateInvoices({ _id: req.params.id}, update );
        if (result.length !== 0) {
            res.send({result: result})
        } else {
            res.status(404).json({Error: "Invoice not found"})
        }
    } else {
        res.sendFile({ Error: "The document was not found, check id number" });
    }
};

// Delete ---------------- Delete Invoice @ DELETE /api/invoices/:id
const deleteInvoice = async (req, res) => {
    invoices.deleteByID(req.params.id)
    .then((deletedCount) => {
        if (deletedCount === 1) {
            res.status(204).json({ response: 'Purchase document deleted'});
        } else {
            res.status(404).json({ error: 'The purchase document was not found'})
        };
    })
    .catch((error) => {
        console.error(error);
        res.send({ error: "Request to delete by ID failed" });
    });
};

module.exports = { createInvoice, getInvoices, updateInvoice, deleteInvoice};