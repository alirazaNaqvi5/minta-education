'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    class CourseCategories extends Model {
      
    };
    CourseCategories.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        create_time: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'coursecategories',
        timestamps: false
    });
    return CourseCategories;
};