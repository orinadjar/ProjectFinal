import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    // Reference to the User collection (each product is associated with a user)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",  // Reference to the User collection
    },

    name:{
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },

}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const productSchema = new mongoose.Schema({

    // Reference to the User collection (each product is associated with a user)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",  // Reference to the User collection
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    reviews: [reviewSchema],

    rating:{
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        ewquires: true,
        default:0,
    },
    price:{
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the product model based on the schema
const Product = mongoose.model("Product", productSchema);

export default Product;