// import 'dotenv/config';
// import express from 'express';
// import asyncHandler from 'express-async-handler';
// import * as budgets from './invoice-model.mjs'; 

// const app = express();

// const PORT = process.env.PORT;

// // REST needs JSON MIME type
// app.use(express.json());

// // Create ----------------------
// app.post("/budgets", ( req, res) => {
//     console.log("req.body", req.body)
//     budgets.createBudget(
//         req.body.amount,
//         req.body.category
//         )
//     .then((budget) => {
//         res.status(201).json(budget);
//     })
//     .catch((error) => {
//         console.log(error);
//         res.status(400).json({ error: "Creation of a budget document failed, check your syntax." });
//     });
// });

// // Retrieve ----------------
// function budgetFilter(req) {
//     let filter = {};
//     if (req.body.category !== undefined) {
//         filter.category = req.body.category;
//     }
//     return filter;
// }

// app.get("/budgets", asyncHandler( async ( req, res) => {
//     // console.log(req.body)
//     const filter = budgetFilter(req);
//     const result = await budgets.findBudget(filter);
//     if (result.length !== 0) {
//         res.send(result)
//     } else {
//         res.status(404).json({Error: "Invoice not found"})
//     }
// }));

// // Update ----------------
// app.put("/budgets/:id", async (req, res) => {
//     console.log("params", req.params)
//     console.log("body", req.body)
//     const budget = await budgets.findByCategory(req.params.category);
//     if (budget !== null) {
//         const update = {};
//         if (req.body.amount !== undefined) {
//         update.amount = req.body.amount;
//         }
//         const result = await budgets.updateInvoices({ category: req.params.category}, update );
//         if (result.length !== 0) {
//             res.send({result: result})
//         } else {
//             res.status(404).json({Error: "Budget not found"})
//         }
//     } else {
//         res.sendFile({ Error: "The document was not found, check id number" });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}...`);
// });