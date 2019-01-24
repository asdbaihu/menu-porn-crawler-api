const httpStatus = require('http-status-codes'),
  errors = {
    log: message => console.error.bind(console, message),
    response: {
      r1: stack => {
        throw {
          status: httpStatus.FAILED_DEPENDENCY,
          erro: {
            stack,
            code: 1,
            message: 'error in query sequelize'
          }
        }
      }
    }
  };

module.exports = errors;
