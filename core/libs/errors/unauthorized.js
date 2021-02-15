const ApplicationError = require('./application-error');

class Unauthorized extends ApplicationError {
  constructor(message, code = null, param = null, metadata = {}) {
    const errorJson = [
      {
        message: message || 'Unauthorized',
        code,
        param,
        metadata
      }
    ];

    super(errorJson, 401, 'Unauthorized');
  }
}

module.exports = Unauthorized;
