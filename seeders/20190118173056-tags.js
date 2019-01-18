'use strict';
const TagModel = require('../src/models/tag.model');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const model = queryInterface
    .sequelize
    .define('tags',
      TagModel.defineEntityStructure()
    );

  return model
    .sync()
    .then(
      _ => queryInterface
        .bulkInsert('tags', [
          new TagModel(
            {
              name: 'milf'
            }
          )
        ], {})
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tags');
  }
};
