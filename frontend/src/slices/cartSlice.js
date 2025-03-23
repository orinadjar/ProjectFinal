import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// Initial state for the cart. If there's a saved cart in localStorage, parse it; otherwise, start with an empty cart.
const initialState = localStorage.getItem("cart") 
  ? JSON.parse(localStorage.getItem("cart")) // Parse the cart data from localStorage if available
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }; // Initialize with an empty cart if no data in localStorage



// Creating the cart slice using Redux Toolkit's createSlice
const cartSlice = createSlice({
    name: "cart", // Name of the slice (can be used for debugging and logging)
    initialState, // The initial state of the cart (either from localStorage or a default empty state)
    reducers: {
        // Reducer function to add an item to the cart
        addToCart: (state, action) => {

            const item = action.payload; // Get the item to add from the action payload

            // Check if the item already exists in the cart
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                // If the item exists, update its information (replaces old data with new data)
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                // If the item doesn't exist, add it to the cart array
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);

        },

        removeFromCart: (state, action) => {

            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            return updateCart(state);
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },

        savePaymentMethod: (state, action) => {
            state.PaymetMethod = action.payload;
            return updateCart(state);
        }
    },
});

// Exporting the addToCart action to be dispatched elsewhere in the app
export const { removeFromCart, addToCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

// Exporting the reducer to be used in the Redux store
export default cartSlice.reducer;
