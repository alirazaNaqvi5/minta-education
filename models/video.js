'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  };
  Video.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    video_url: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    order: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    courseId: {
      type: Sequelize.UUID,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
        model: 'Courses',
        key: 'id',
        as: 'courseId',
      }
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    }
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};