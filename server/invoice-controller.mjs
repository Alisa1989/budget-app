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
    if (req.query.id !== undefined) {
        filter.id = req.query.id;
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
    res.send(result)
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});