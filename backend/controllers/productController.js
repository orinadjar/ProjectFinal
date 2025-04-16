import asyncHandler from "../middleware/asyncHandler.js" // Importing the asyncHandler utility
import Product from "../models/productModel.js"

// @desc Fetch all product
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req,res) => {
    const category = req.query.category;
    const queryObject = category ? { category } : {};
    
    const products = await Product.find(queryObject);
    res.json(products);
});

// @desc Fetch product by id
// @route GET /api/products/:id
// @access Public
const getProductsById = asyncHandler(async (req,res) => {

    const product = await Product.findById(req.params.id) // findById - Mongoose quary function
    if (product){
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Product noot found');
    }
});

// @desc Get all unique categories
// @route GET /api/products/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('category');
    res.json(categories);
});

export { getProducts, getProductsById, getCategories };