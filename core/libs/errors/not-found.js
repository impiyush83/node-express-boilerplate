const ApplicationError = require('./application-error');

class NotFound extends ApplicationError {
  constructor(message, code = null, param = null, metadata = {}) {
    const errorJson = [
      {
        message: message || 'Not Found',
        code,
        param,
        metadata
      }
    ];

    super(errorJson, 404, 'Not Found');
  }
}

module.exports = NotFound;
