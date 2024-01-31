const path = require('path');
const express = require ('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db.js');
const PORT = process.env.PORT || 3000;

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// REST needs JSON MIME type
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/invoices', require('./routes/invoiceRoutes.js'));
app.use('/api/budgets', require('./routes/budgetRoutes.js'));
app.use('/api/users', require('./routes/userRoutes.js'));

//server frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});