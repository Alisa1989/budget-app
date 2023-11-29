const express = require ('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db.js');
const PORT = process.env.PORT || 3000;

connectDB();
const app = express();

// REST needs JSON MIME type
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/invoices', require('./routes/invoiceRoutes.js'));
app.use('/api/budgets', require('./routes/budgetRoutes.js'));
app.use('/api/users', require('./routes/userRoutes.js'));
app.use('/api/micros', require('./routes/microservicesRoutes.js'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});