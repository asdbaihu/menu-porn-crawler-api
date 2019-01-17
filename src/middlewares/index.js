const logger = require('./logger.mid');

module.exports = app => {
  app.use((req, res, next) => logger(req, res, next));
};
