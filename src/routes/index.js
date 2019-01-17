const base = require('./base.rou')
  , sites = require('./sites.rou');

module.exports = (app) => {
  app.use('/', base);
  app.use('/v1/routes', sites);
};
