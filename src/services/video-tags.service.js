const db = require('../connections/db.con')
  , VideoTagsModel = require('../models/video-tags.model');

const videoTagsService = db.instance
  .define('video_tags',
    VideoTagsModel.defineEntityStructure()
  );

module.exports = videoTagsService;
