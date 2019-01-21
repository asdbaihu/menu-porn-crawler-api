const Sequelize = require('sequelize')

  , defaultFields = require('./default.model')
  , { smartMerge } = require('../utils/helpers');

class SiteModel {
  constructor(site) {
    this.name = '';
    this.url = '';
    this.id = undefined;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    if (!site || typeof site !== 'object') return;
    smartMerge(this, site);
  }

  static defineEntityStructure() {
    return {
      ...defaultFields,
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {            
          isUrl: true
        }
      }
    };
  }
}
module.exports = SiteModel;
