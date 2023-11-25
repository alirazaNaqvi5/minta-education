'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  Certificate.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    issuedAt: {
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
    courseId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Courses',
        key: 'id',
        as: 'courseId',
      }
    },
  }, {
    sequelize,
    modelName: 'Certificate',
  });
  return Certificate;
};
