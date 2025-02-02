// Utility function to round and format numbers to two decimal places (used for price calculations)
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    // Calculate the total price of items in the cart
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // Calculate shipping price (If order is over 50$, then free shipping; otherwise, $10 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 50 ? 0 : 10);

    // Calculate tax price (7% tax)
    state.taxPrice = addDecimals(Number((0.07) * state.itemsPrice).toFixed(2));

    // Calculate total price (items + shipping + tax)
    state.totalPrice = (
        Number(state.itemsPrice) + 
        Number(state.shippingPrice) + 
        Number(state.taxPrice)).toFixed(2);
    
    // Store the updated cart state in localStorage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}

