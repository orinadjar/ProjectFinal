import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Extend the existing apiSlice by injecting new endpoints
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Define the getProducts query
        getProducts: builder.query({
            // Define the API request configuration
            query: () => ({
                url: PRODUCTS_URL, // The URL endpoint for fetching products
            }),
            // Configure how long to keep unused data in the cache (in seconds)
            keepUnusedDataFor: 5,
        }),
    }),
});

// Export a custom hook for the getProducts query
export const { useGetProductsQuery } = productsApiSlice;
