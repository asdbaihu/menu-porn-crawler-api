'use strict';
const VideoModel = require('../src/models/video.model');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const model = queryInterface
    .sequelize
    .define('videos',
      VideoModel.defineEntityStructure()
    );

  return model
    .sync()
    .then(
      _ => queryInterface
        .bulkInsert('videos', [
          new VideoModel(
            {
                siteId: 1,
                name: 'babá peituda desesperada por pau - maxim law',
                url: 'https://pt.pornhub.com/view_video.php?viewkey=ph5c1aa4d9b5c35',
                thumb: 'https://ci.phncdn.com/videos/201812/19/197546511/original/(m=ecuKGgaaayrGbid)(mh=cktFB-bzCRHRinMq)5.jpg',
                time: '00:14:35',
                views: 933859,
                clicks: 0
            }
          )
        ], {})
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('videos');
  }
};
