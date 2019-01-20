const Sequelize = require('sequelize')

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
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
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
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      views: {
        type: Sequelize.TIME,
        allowNull: false
      },
      clicks: {
        type: Sequelize.INTEGER
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
module.exports = VideoModel;
