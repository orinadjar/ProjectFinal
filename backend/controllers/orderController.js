import asyncHandler from "../middleware/asyncHandler.js" // Importing the asyncHandler utility
import Order from "../models/orderModel.js"

// @desc Create an order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req,res) => {

    res.send('add order items')

});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req,res) => {

    res.send('get my orders');

});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req,res) => {

    res.send('get order by id');

});

// @desc Update orderto paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req,res) => {

    res.send('update order to paid');

});

// @desc Update orderto delivered
// @route GET /api/orders/:id/deliver
// @access Private/admin
const updateOrderToDelivered = asyncHandler(async (req,res) => {

    res.send('update order to delivered');

});

// @desc get al orders
// @route GET /api/orders
// @access Private/admin
const getOrders = asyncHandler(async (req,res) => {

    res.send('get all orders');

});

export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders };