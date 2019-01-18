const logger = require('./logger.mid')
  , cors = require('./cors.mid');

module.exports = app => {
  app.use(logger);
  app.use(cors);
};
