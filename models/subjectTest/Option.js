'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Option extends Model {
    static associate(models) {
      Option.belongsTo(models.Question, {
        foreignKey: 'questionId',
        onDelete: 'CASCADE'
      });
    }
  };
  Option.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    text: {
      type: Sequelize.STRING
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
  }, {
    sequelize,
    modelName: 'Option',
  });
  return Option;
};
