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

// @desc Create new product
// @route POST /api/products
// @access Private/admin
const createProduct = asyncHandler(async (req,res) => {
    
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createProduct = await product.save();
    res.status(201).json(createProduct);
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc Uppdate a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req,res) => {
    const { name, price, description, image, brand,category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    else{
        res.status(404);
        throw new Error('Resource not found');
    }
});

export { getProducts, getProductsById, getCategories, createProduct, deleteProduct, updateProduct };