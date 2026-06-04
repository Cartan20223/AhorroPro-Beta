const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
    error: err.name || 'Error'
  });
};

module.exports = errorHandler;
