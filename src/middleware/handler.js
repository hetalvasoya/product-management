const requestHandler = (req, res, next) => {
    const err = new Error(`Requested url ${req.path} not found`);
    err.statusCode = 404;
    next(err);
}

const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
}

export {
    requestHandler,
    errorHandler
}