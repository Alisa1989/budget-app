import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as invoices from './invoice-model.mjs'; 

const app = express();

const PORT = process.env.PORT;

app.get("/create", async ( req, res) => {
    const invoice = await invoices.createInvoice(req.query.title, req.query.date, 
        req.query.notes, req.query.amount, req.query.recurring)
    res.send(invoice)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});