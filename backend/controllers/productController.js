import asyncHandler from "../middleware/asyncHandler.js" // Importing the asyncHandler utility
import Product from "../models/productModel.js"

// @desc Fetch all product
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req,res) => {

    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    // catching the key word from url and regex it to search ( case insensitive )
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

    const category = req.query.category;
    const queryObject = category ? { category, ...keyword } : {...keyword};

    const sortParam = req.query.sort;
    let sortOption = {};

    if (sortParam === 'price_asc') {
        sortOption = { price: 1 };
    } 
    else if (sortParam === 'price_desc') {
        sortOption = { price: -1 };
    } 
    else if (sortParam === 'rating_desc') {
        sortOption = { rating: -1 };
    } 
    else if (sortParam === 'rating_asc') {
        sortOption = { rating: 1 };
    }
      

    const count = await Product.countDocuments( queryObject ); // gets total num of products
    
    const products = await Product.find(queryObject).sort(sortOption).limit(pageSize).skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
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


// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {

    const{ rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({message: 'Review added!'});
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


// @desc GET top rated products
// @route GET /api/products/top
// @access Public
const getTopRatedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.status(200).json(products);
});


export { getProducts, getProductsById, getCategories, createProduct, deleteProduct, updateProduct, createProductReview, getTopRatedProducts };