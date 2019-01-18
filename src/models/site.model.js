const Sequelize = require('sequelize')

  , validations = require('../utils/validations');

class SiteModel {
  constructor(site) {
    this.name = '';
    this.url = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();

    if (!site || typeof site !== 'object') return;
    validations.smartMerge(this, site);
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
      url: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
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
module.exports = SiteModel;
