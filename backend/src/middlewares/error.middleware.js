const errorHandler = (err, req, res, next) => {
  console.error('❌ ERROR GLOBAL:', {
    message: err.message,
    name: err.name,
    stack: err.stack,
    cause: err.cause,
  });

  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
    error: err.name || 'Error'
  });
};

module.exports = errorHandler;
