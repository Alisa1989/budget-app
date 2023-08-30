import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as invoices from './invoice-model.mjs'; 

const app = express();

const PORT = process.env.PORT;

// Create ----------------------
app.get("/create", asyncHandler( async ( req, res) => {
    const invoice = await invoices.createInvoice(req.query.name, req.query.date, 
        req.query.notes, req.query.price, req.query.recurring)
    res.send(invoice)
}));

// Retrieve --------------------
function invoiceFilter(req) {
    let filter = {};
    if (req.query._id !== undefined) {
        console.log("id is", req.query._id);
        filter._id = req.query._id;
    }
    if (req.query.name !== undefined) {
        filter.name = req.query.name;
    }
    if (req.query.price !== undefined) {
        filter.price = req.query.price;
    }
    if (req.query.date !== undefined) {
        filter.date = req.query.date;
    }
    if (req.query.notes !== undefined) {
        filter.notes = req.query.notes;
    }
    if (req.query.recurring !== undefined) {
        filter.recurring = req.query.recurring;
    }
    return filter;
}

app.get("/retrieve", asyncHandler( async ( req, res) => {
    const filter = invoiceFilter(req);
    const result = await invoices.findInvoices(filter);
    if (result.length !== 0) {
        res.send(result)
    } else {
        res.status(404).json({Error: "Invoice not found"})
    }
}));


// Delete ----------------
async function deleteByID(req, res) {
    try {
        const deletedCount = await invoices.deleteByID(req.query._id)
        res.send({ deletedCount: deletedCount});
    } catch (error){
        console.error(error);
        res.send({error: 'Request failed'});    
    }
}

async function deleteByProperty(req, res) {
    const filters = invoiceFilter(req);
    try {
        if (Object.keys(filters).length === 0){
            throw "Error: Filter is not valid"
        }
        const deletedCount = await invoices.deleteByProperty(filters);
        res.send({ deletedCount: deletedCount})
    } catch (error){
        console.log(error);
        res.send({error: 'Request failed'})
    }
}

app.get("/delete", (req, res) => {
    if (req.query._id !== undefined) {
        deleteByID(req, res);
    } else {
        deleteByProperty(req, res);
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

