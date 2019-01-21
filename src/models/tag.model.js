const Sequelize = require('sequelize')

  , defaultFields = require('./default.model')
  , { smartMerge } = require('../utils/helpers');

class TagModel {
  constructor(tag) {
    this.name = '';
    this.id = undefined;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    if (!tag || typeof tag !== 'object') return;
    smartMerge(this, tag);
  }

  static defineEntityStructure() {
    return {
      ...defaultFields,
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        set(value) {
          this.setDataValue('name', value.toLowerCase());
        }
      }
    };
  }
}
module.exports = TagModel;
