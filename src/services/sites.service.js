const db = require('../connections/db.con')
  , SiteModel = require('../models/site.model');

const sitesService = db.instance
  .define('sites',
    SiteModel.defineEntityStructure()
  );

module.exports = sitesService;
