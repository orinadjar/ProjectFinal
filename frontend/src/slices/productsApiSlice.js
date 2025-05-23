import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Extend the existing apiSlice by injecting new endpoints
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Define the getProducts query
        getProducts: builder.query({
            // Define the API request configuration
            query: (category) => ({
                url: PRODUCTS_URL, // The URL endpoint for fetching products
                params: category ? { category } : {},
            }),
            // Configure how long to keep unused data in the cache (in seconds)
            keepUnusedDataFor: 5,
        }),
        getAllProducts: builder.query({
            // Define the API request configuration
            query: () => ({
                url: PRODUCTS_URL, // The URL endpoint for fetching products
            }),
            // Configure how long to keep unused data in the cache (in seconds)
            keepUnusedDataFor: 5,
        }),
        getCategories: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/categories`,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (Pid) => ({
                url: `${PRODUCTS_URL}/${Pid}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

// Export a custom hook for the getProducts query
export const { 
    useGetProductsQuery, 
    useGetProductDetailsQuery,
    useGetCategoriesQuery ,
    useGetAllProductsQuery,
    useCreateProductMutation,
} = productsApiSlice;
