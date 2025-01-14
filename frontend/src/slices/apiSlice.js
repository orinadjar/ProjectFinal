import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// Define a base query for API requests, setting the base URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create an API slice
export const apiSlice = createApi({
    // The base query that will be used for all endpoints
    baseQuery,
     
    // Define tag types for resources (used for caching and invalidation)
    tagTypes: ['Product', 'Order', 'User'],
    
    // Define endpoints for API requests (initially empty)
    endpoints: (builder) => ({}),
});
