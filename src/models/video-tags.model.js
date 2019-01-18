const Sequelize = require('sequelize')

  , validations = require('../utils/validations');

class VideoTagsModel {
  constructor(videoTags) {
    this.name = '';
    this.videoId = '';
    this.id = undefined;
    this.tagId = undefined;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    if (!videoTags || typeof videoTags !== 'object') return;
    validations.smartMerge(this, videoTags);
  }

  static defineEntityStructure() {
    return {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
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
module.exports = VideoTagsModel;
