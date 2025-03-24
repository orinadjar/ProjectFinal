import express from 'express';
// const express = require('express');
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
const port = process.env.PORT || 5000;



connectDB(); // connect to mongo

const app = express();

// Middleware to parse incoming JSON requests and make the data available in req.body
app.use(express.json());
// Middleware to parse URL-encoded data (from HTML form submissions)
// extended: true allows parsing of nested objects and arrays
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => { 
    res.send('API is running...');
});

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes);


// Middleware for handling 404 errors
app.use(notFound);

// Middleware for handling errors
app.use(errorHandler);



app.listen(port, () => console.log(`server running on port ${port}`))