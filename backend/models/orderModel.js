import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    // Reference to the User collection (each order is associated with a user)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",  // Reference to the User collection
    },
    
    // Array of order items (each item in the order)
    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type:String, required:true },
        price: { type: String, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product", // Reference to the Product collection
        },
    }],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true},
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice:{
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

// Create the Order model based on the schema
const Order = mongoose.model('Order', orderSchema);

export default Order;