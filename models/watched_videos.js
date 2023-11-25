'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class WatchedVideos extends Model {
    static associate(models) {
     
    }
  };
  WatchedVideos.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    watchedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    userId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    videoId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Videos',
        key: 'id',
        as: 'videoId',
      }
    },
  }, {
    sequelize,
    modelName: 'WatchedVideos',
  });
  return WatchedVideos;
};
