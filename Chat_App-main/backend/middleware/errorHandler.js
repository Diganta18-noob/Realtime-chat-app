const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log the actual error internally
  console.error("[Error Handler] Exception caught:", err.message);
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export default errorHandler;
