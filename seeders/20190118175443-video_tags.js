'use strict';
const VideoTagsModel = require('../src/models/video-tags.model');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const model = queryInterface
    .sequelize
    .define('video_tags',
      VideoTagsModel.defineEntityStructure()
    );

  return model
    .sync()
    .then(
      _ => queryInterface
        .bulkInsert('video_tags', [
          new VideoTagsModel(
            {
              videoId: 1,
              name: 'butt'
            }
          ),
          new VideoTagsModel(
            {
              videoId: 1,
              name: 'blowjob'
            }
          ) 
        ], {})
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('video_tags');
  }
};
