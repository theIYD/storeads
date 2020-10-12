class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message;
    this.error = true;
  }
}

const handleError = (body, _req, res, next) => {
  let level = ''; // Use level when using a logger like CloudWatch
  if (body['error']) {
    level = 'error';
    const { message } = body;
    statusCode = body['statusCode'] || 500;
    res.status(statusCode).json({
      error: 1,
      message,
    });
  } else {
    level = 'info';
    res.status(200).json({
      error: 0,
      response: body,
    });
  }

  next();
};

module.exports = { ErrorHandler, handleError };
