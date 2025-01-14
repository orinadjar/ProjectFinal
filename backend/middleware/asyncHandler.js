const asyncHandler = fn => (req, res, next) => {
    // Promise.resolve ensures that the async function fn returns a Promise.
    // If there's an error in the async function, catch passes the error to next for error handling.
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;