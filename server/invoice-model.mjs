import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const invoiceSchema = mongoose.Schema({
    // title, amount, date, recurring, notes
    title: { type: String, required: true},
    date: { type: Date, required: true},
    notes: { type: String, required: false},
    amount: { type: Number, required: true},
    recurring: {type: Boolean}

})

const Invoice = mongoose.model("Invoice", invoiceSchema);

const createInvoice = async ( title, date, notes, amount, recurring) =>{
    const invoice = new Invoice({title: title, date: date, notes: notes, amount: amount, recurring: recurring})
    return invoice.save();
}

db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: 'Failed to connect to server'});
    } else {
    console.log("Successfully connected to MongoDB using Mongoose!");
    }
});

export {createInvoice}