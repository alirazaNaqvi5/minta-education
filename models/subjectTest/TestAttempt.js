'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class TestAttempt extends Model {
    static associate(models) {
      TestAttempt.belongsTo(models.Test, {
        foreignKey: 'testId',
        onDelete: 'CASCADE'
      });
      TestAttempt.belongsTo(models.users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      TestAttempt.hasMany(models.Answer, {
        foreignKey: 'testAttemptId'
      });
    }
  };
  TestAttempt.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    score: {
      type: Sequelize.INTEGER
    },
    testId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Tests',
        key: 'id',
        as: 'testId',
      }
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
  }, {
    sequelize,
    modelName: 'TestAttempt',
  });
  return TestAttempt;
};
