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
              views: 2000,
              time: '00:02:30',
              name: 'MILF DE CORPO PERFEITO É FODIDA COM DEDO ENFIADO NO CÚ',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=ph5c0c9d8bb437e'
            }
          ),
          new VideoModel(
            {
              siteId: 1,
              views: 10,
              time: '00:01:00',
              name: 'TESTE 1',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=TESTE-1'
            }
          ),
          new VideoModel(
            {
              siteId: 1,
              views: 10,
              time: '00:01:00',
              name: 'TESTE 2',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=TESTE-2'
            }
          ),
          new VideoModel(
            {
              siteId: 1,
              views: 10,
              time: '00:01:00',
              name: 'TESTE 3',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=TESTE-3'
            }
          ),
          new VideoModel(
            {
              siteId: 1,
              views: 10,
              time: '00:01:00',
              name: 'TESTE 4',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=TESTE-4',
            }
          ),
          new VideoModel(
            {
              siteId: 1,
              views: 10,
              time: '00:01:00',
              name: 'TESTE 5',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=TESTE-5',
            }
          ),
          new VideoModel(
            {
              siteId: 1,
              views: 10,
              time: '00:01:00',
              name: 'TESTE 6',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=TESTE-6',
            }
          ),
          new VideoModel(
            {
              siteId: 1,
              views: 10,
              time: '00:01:00',
              name: 'TESTE 7',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=TESTE-7',
            }
          ),
          new VideoModel(
            {
              siteId: 1,
              views: 10,
              time: '00:01:00',
              name: 'TESTE 8',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=TESTE-8',
            }
          ),
          new VideoModel(
            {
              siteId: 1,
              views: 10,
              time: '00:01:00',
              name: 'TESTE 9',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=TESTE-9',
            }
          ),
          new VideoModel(
            {
              siteId: 1,
              views: 10,
              time: '00:01:00',
              name: 'TESTE 10',
              url: 'https://pt.pornhub.com/view_video.php?viewkey=TESTE-10',
            }
          )
        ], {})
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('videos');
  }
};
