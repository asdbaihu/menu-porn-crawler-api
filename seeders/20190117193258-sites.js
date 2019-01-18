'use strict';

const SiteModel = require('../src/models/site.model');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface
      .createTable('Sites',
        SiteModel.defineEntityStructure()
      )
      .then(
        _ => {
          return queryInterface
            .bulkInsert('Sites', [
              new SiteModel(
                {
                  name: 'PornHub',
                  url: 'https://pt.pornhub.com',
                }
              )
            ], {});
        }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sites');
  }
};
