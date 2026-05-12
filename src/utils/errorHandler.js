// Global Error Wrapper untuk menghindari Try-Catch yang berulang (DRY Principle)
const catchAsync = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };
  
  // Global Error Middleware
  const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
  };
  
  module.exports = { catchAsync, globalErrorHandler };