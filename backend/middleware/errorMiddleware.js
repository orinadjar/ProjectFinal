// Middleware for handling 404 errors (Route not found)
const notFound = (req, res, next) => { 
    // Create a new error with the requested URL
    const error = new Error(`Not Found - ${req.originalUrl}`);
    // Set HTTP status code to 404
    res.status(404);
    // Pass the error to the next middleware (errorHandler)
    next(error);
};

// Centralized error handler middleware
const errorHandler = (err, req, res, next) => {
    // Set the status code, defaulting to 500 if it's not already set
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Check if the error is a Mongoose "CastError" (invalid ObjectId)
    if (err.name === 'CastError' && err.kind === 'ObjectId'){
        // Customize the error message for invalid ObjectId
        message = `Resource not found`;
        statusCode = 404;  // Set status code to 404
    }

    // Respond with the error message and stack trace (sensitive info hidden in production)
    res.status(statusCode).json({
        message,  // The error message
        stack: process.env.NODE_ENV === 'production' ? '🐲' : err.stack,  // Mask stack trace in production
    });
};

// Export the middlewares to use in other parts of the app
export { notFound, errorHandler };
