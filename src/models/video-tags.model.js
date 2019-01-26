const Sequelize = require('sequelize')

  , defaultFields = require('./default.model')
  , { smartMerge } = require('../utils/helpers');

class VideoTagsModel {
  constructor(videoTags) {
    this.name = '';
    this.videoId = '';
    this.id = undefined;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    if (!videoTags || typeof videoTags !== 'object') return;
    smartMerge(this, videoTags);
  }

  static defineEntityStructure() {
    return {
      ...defaultFields,
      videoId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: { 
          key: 'id',
          model: 'videos' 
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('name', value.toLowerCase());
        }
      }
    };
  }
}
module.exports = VideoTagsModel;
