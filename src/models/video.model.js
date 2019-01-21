const Sequelize = require('sequelize')

  , defaultFields = require('./default.model')
  , { smartMerge } = require('../utils/helpers');

class VideoModel {
  constructor(video) {
    this.siteId = 0;
    this.name = '';
    this.url = '';
    this.views = 0;
    this.clicks = 0;
    this.id = undefined;
    this.time = undefined;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    if (!video || typeof video !== 'object') return;
    smartMerge(this, video);
  }

  static defineEntityStructure() {
    return {
      ...defaultFields,
      siteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          key: 'id',
          model: 'sites' 
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('name', value.toLowerCase());
        }
      },
      url: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {            
          isUrl: true
        }
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {  
          isInt: true
        }
      },
      clicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {  
          isInt: true
        }
      }
    };
  }
}
module.exports = VideoModel;
