require('dotenv').config();
const express = require('express');
const cors = require('cors');

const Transaction = require('./models/transaction.js');
const mongoose =require ("mongoose");
const app = express();

app.use(cors());

app.use(express.json());
app.get('/api/test', (request,response) => {
    response.json('test ok23');
});

app.post('/api/transaction',async (request,response) => {
    
    await mongoose.connect(process.env.MONGO_URL);
    const {name,description,datetime,price}=request.body;
    const transaction = await Transaction.create({name,description,datetime,price});
    response.json(transaction);

});

app.get('/api/transactions', async(request,response)=> {
    
    await mongoose.connect(process.env.MONGO_URL); 
    const transactions = await Transaction.find();
    response.json(transactions);
});


app.listen(4040);