import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';

// Create and configure the Redux store
const store = configureStore({
    // Add the reducers to the store
    reducer: {
        // Add the API slice reducer using its unique reducerPath
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // Enhance the default middleware to include the API slice middleware
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    // Enable Redux DevTools for easier debugging in development mode
    devTools: true,
});
 
// Export the store to be used in the application
export default store;
