const Sequelize = require('sequelize')

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
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    };
  }
}
module.exports = TagModel;
