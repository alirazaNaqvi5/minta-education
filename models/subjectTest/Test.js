'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Test extends Model {
    static associate(models) {
      Test.hasMany(models.Question, {
        foreignKey: 'testId'
      });
      Test.belongsTo(models.users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      Test.belongsTo(models.courses, {
        foreignKey: 'courseId',
        onDelete: 'CASCADE'
      });
    }
  };
  Test.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    passingscore: {
      type: Sequelize.INTEGER,
      defaultValue: 0
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
    }
  }, {
    sequelize,
    modelName: 'Test',
  });
  return Test;
};
