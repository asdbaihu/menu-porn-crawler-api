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
      },
      r6: stack => {
        throw {
          status: httpStatus.NO_CONTENT,
          erro: {
            stack,
            code: 6,
            message: 'not found content'
          }
        }
      },
      r11: stack => {
        throw {
          status: httpStatus.FAILED_DEPENDENCY,
          erro: {
            stack,
            code: 11,
            message: 'error to run crawler'
          }
        }
      }
    }
  };

module.exports = errors;
