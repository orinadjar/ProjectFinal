import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const importData = async () => { // every mongoose method returns a promise so we use async await
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Insert user data into the database
        const createdUsers = await User.insertMany(users);  // getting the array of users to created users

        const adminUser = createdUsers[0]._id;

        // Add the admin user's ID to each product
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser};  // Spread operator adds user field
        });
        
        // Insert the modified product data into the database
        await Product.insertMany(sampleProducts);
        console.log(`Admin User ID: ${adminUser}`);


        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (err) {
        console.log(`${err}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();

    } catch (err) {
        console.log(`${err}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === '-d'){ // -d will be the 2nd index when running "node backend/seeder.js -d"
    destroyData();
}else{
    importData();
}
