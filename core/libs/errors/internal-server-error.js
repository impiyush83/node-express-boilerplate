const ApplicationError = require('./application-error');

class InternalServerError extends ApplicationError {
  constructor(error) {
    let errorMessage = 'Internal Server Error!';

    if (error && (typeof error === 'object') && ('message' in error) && process.env.NODE_ENV !== 'production') {
      errorMessage = error.message;
    }

    const errorJson = [
      {
        message: errorMessage
      }
    ];

    super(errorJson, 500, errorMessage);
  }
}

module.exports = InternalServerError;
