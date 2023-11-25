'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Answer extends Model {
    static associate(models) {
      Answer.belongsTo(models.Option, {
        foreignKey: 'optionId',
        onDelete: 'CASCADE'
      });
      Answer.belongsTo(models.Question, {
        foreignKey: 'questionId',
        onDelete: 'CASCADE'
      });
      Answer.belongsTo(models.TestAttempt, {
        foreignKey: 'testAttemptId',
        onDelete: 'CASCADE'
      });
    }
  };
  Answer.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    optionId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Options',
        key: 'id',
        as: 'optionId',
      }
    },
    questionId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Questions',
        key: 'id',
        as: 'questionId',
      }
    },
    testAttemptId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'TestAttempts',
        key: 'id',
        as: 'testAttemptId',
      }
    },
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};
