import express from 'express';
import products from './data/products.js';
// const express = require('express');
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;

connectDB(); // connect to mongo

const app = express();

app.get('/', (req, res) => { 
    res.send('API is running...');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p.id == req.params.id);
    res.json(product);
})

app.listen(port, () => console.log(`server running on port ${port}`))