const db = require('../connections/db.con')
  , VideoModel = require('../models/video.model');

const videoService = db.instance
  .define('videos',
    VideoModel.defineEntityStructure()
  );

module.exports = videoService;
