const base = require('./base.rou')
  , sites = require('./sites.rou')
  , crawler = require('./crawler.rou');

module.exports = (app) => {
  app.use('/', base);
  app.use('/v1/sites', sites);
  app.use('/v1/crawler', crawler);
};
