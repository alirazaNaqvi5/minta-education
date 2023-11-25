'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Question extends Model {
    static associate(models) {
      Question.hasMany(models.Option, {
        foreignKey: 'questionId'
      });
      Question.belongsTo(models.Test, {
        foreignKey: 'testId',
        onDelete: 'CASCADE'
      });
    }
  };
  Question.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    text: {
      type: Sequelize.TEXT
    },
    correctAnswer: {
      type: Sequelize.STRING
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
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
