import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as invoices from './invoice-model.mjs'; 

const app = express();

const PORT = process.env.PORT;

// REST needs JSON MIME type
app.use(express.json());

// Create ----------------------
app.post("/log", ( req, res) => {
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
});

// Retrieve --------------------
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

app.get("/log", asyncHandler( async ( req, res) => {
    // console.log(req.body)
    const filter = invoiceFilter(req);
    const result = await invoices.findInvoice(filter);
    if (result.length !== 0) {
        res.send(result)
    } else {
        res.status(404).json({Error: "Invoice not found"})
    }
}));

// Update ----------------
app.put("/log/:id", async (req, res) => {
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
        filter.category = req.body.category;
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
});

// Delete ----------------
app.delete("/log/:id", (req, res) => {
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
});

// BUDGET ----------------------
// Create ----------------------
app.post("/budgets", ( req, res) => {
    console.log("req.body", req.body)
    invoices.createBudget(
        req.body.amount,
        req.body.category
        )
    .then((budget) => {
        res.status(201).json(budget);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json({ error: "Creation of a budget document failed, check your syntax." });
    });
});

// Retrieve ----------------
function budgetFilter(req) {
    let filter = {};
    if (req.body.category !== undefined) {
        filter.category = req.body.category;
    }
    return filter;
}

app.get("/budgets", asyncHandler( async ( req, res) => {
    // console.log(req.body)
    const filter = budgetFilter(req);
    const result = await invoices.findBudget(filter);
    if (result.length !== 0) {
        res.send(result)
    } else {
        res.status(404).json({Error: "Invoice not found"})
    }
}));

// Update ----------------
app.put("/budgets/:id", async (req, res) => {
    console.log("params", req.params)
    console.log("body", req.body)
    const budget = await invoices.findByCategory(req.params.category);
    if (budget !== null) {
        const update = {};
        if (req.body.amount !== undefined) {
        update.amount = req.body.amount;
        }
        const result = await invoices.updateInvoices({ category: req.params.category}, update );
        if (result.length !== 0) {
            res.send({result: result})
        } else {
            res.status(404).json({Error: "Budget not found"})
        }
    } else {
        res.sendFile({ Error: "The document was not found, check id number" });
    }
});




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

