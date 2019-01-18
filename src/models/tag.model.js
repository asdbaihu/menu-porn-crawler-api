const Sequelize = require('sequelize')

  , validations = require('../utils/validations');

class TagModel {
  constructor(tag) {
    this.name = '';
    this.id = undefined;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    if (!tag || typeof tag !== 'object') return;
    validations.smartMerge(this, tag);
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
