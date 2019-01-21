const Sequelize = require('sequelize')

  , defaultFields = require('./default.model')
  , { smartMerge } = require('../utils/helpers');

class VideoTagsModel {
  constructor(videoTags) {
    this.name = '';
    this.videoId = '';
    this.id = undefined;
    this.tagId = undefined;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    if (!videoTags || typeof videoTags !== 'object') return;
    smartMerge(this, videoTags);
  }

  static defineEntityStructure() {
    return {
      ...defaultFields,
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          key: 'id',
          model: 'tags' 
        }
      },
      videoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          key: 'id',
          model: 'videos' 
        }
      },
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
module.exports = VideoTagsModel;
