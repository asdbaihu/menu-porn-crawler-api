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
              time: new Date().toLocaleTimeString(),
              name: 'MILF DE CORPO PERFEITO É FODIDA COM DEDO ENFIADO NO CÚ',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=ph5c0c9d8bb437e',
            }
          )
        ], {})
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('videos');
  }
};
