const db = require('../connections/db.con')
  , TagsModel = require('../models/tag.model');

const tagService = db.instance
  .define('tags',
    TagsModel.defineEntityStructure()
  );

module.exports = tagService;
