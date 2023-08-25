import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: 'Failed to connect to server'});
    } else {
    console.log("Successfully connected to MongoDB using Mongoose!");
    }
});
