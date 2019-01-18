'use strict';

const SiteModel = require('../src/models/site.model');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const model = queryInterface
      .sequelize
      .define('sites',
        SiteModel.defineEntityStructure()
      );

    return model
      .sync()
      .then(
        _ => queryInterface
          .bulkInsert('sites', [
            new SiteModel(
              {
                name: 'PornHub',
                url: 'https://pt.pornhub.com',
              }
            )
          ], {})
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sites');
  }
};
