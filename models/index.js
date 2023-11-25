'use strict';
// main model file
import fs from 'fs';
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'test';
const config = require(__dirname + '/../config/config.json')[env];

import User from './user'
import Course from './course'
import CourseCategories from './courseCategories'
import Video from './video'
import Enroled_courses from './enroled_courses'
import certificates from './certificates';
import watched_videos from './watched_videos';
import Answer from './subjectTest/Answer';
import Option from './subjectTest/Option';
import Question from './subjectTest/Question';
import Test from './subjectTest/Test';
import TestAttempt from './subjectTest/TestAttempt';

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {...config, logging: false});
} else {
  console.log('config', config)
  sequelize = new Sequelize(config.database, config.username, config.password, {...config, logging: false});
}

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// db.users = User(sequelize, Sequelize)
// db.courses = Course(sequelize, Sequelize)
// db.videos = Video(sequelize, Sequelize)
// db.enroled_courses = Enroled_courses(sequelize, Sequelize)

const db = {
  sequelize,Sequelize,
  users: User(sequelize, Sequelize),
  courses: Course(sequelize, Sequelize),
  videos: Video(sequelize, Sequelize),
  enroled_courses: Enroled_courses(sequelize, Sequelize),
  certificates: certificates(sequelize, Sequelize),
  watched_videos: watched_videos(sequelize, Sequelize),
  Answer: Answer(sequelize, Sequelize),
  Option: Option(sequelize, Sequelize),
  Question: Question(sequelize, Sequelize),
  Test: Test(sequelize, Sequelize),
  TestAttempt: TestAttempt(sequelize, Sequelize),
  CourseCategories: CourseCategories(sequelize, Sequelize)
};

// hasMany relationshipt with user and course
db.users.hasMany(db.courses, { 
  as: 'courses',
  foreignKey: 'userId'
})
db.courses.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user'
})

// hasMany relationshipt with course and videos
db.courses.hasMany(db.videos, { 
  as: 'videos',
  foreignKey: 'courseId'
})
db.videos.belongsTo(db.courses, {
  foreignKey: 'courseId',
  as: 'course'
})

// hasMany relationshipt with user and videos
db.users.hasMany(db.videos, { 
  as: 'videos',
  foreignKey: 'userId'
})
db.videos.belongsTo(db.courses, {
  foreignKey: 'userId',
  as: 'user'
})

// hasMany relationshipt with course and enroled
db.courses.hasMany(db.enroled_courses, { 
  as: 'enroled_courses',
  foreignKey: 'courseId'
})
db.enroled_courses.belongsTo(db.courses, {
  foreignKey: 'courseId',
  as: 'course'
})

// hasMany relationshipt with user and enroled
db.users.hasMany(db.enroled_courses, { 
  as: 'enroled_courses',
  foreignKey: 'userId'
})
db.enroled_courses.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user'
})
db.watched_videos.belongsTo(db.users, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
db.watched_videos.belongsTo(db.videos, {
  foreignKey: 'videoId',
  onDelete: 'CASCADE'
});
// hasMany relationship with Video and WatchedVideos
db.videos.hasMany(db.watched_videos, { 
  as: 'watchedVideos',
  foreignKey: 'videoId'
})
db.watched_videos.belongsTo(db.videos, {
  foreignKey: 'videoId',
  as: 'video'
})

// hasMany relationship with User and WatchedVideos
db.users.hasMany(db.watched_videos, { 
  as: 'watchedVideos',
  foreignKey: 'userId'
})
db.watched_videos.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user'
})
db.certificates.belongsTo(db.users, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
db.certificates.belongsTo(db.courses, {
  foreignKey: 'courseId',
  onDelete: 'CASCADE'
});

Object.keys(db).forEach(modelName => {
  if (db[modelName]?.associate) {
    
    db[modelName].associate(db);
  }
});

db.sequelize.sync({force: false,alter: false})
// console.log('######', db)

module.exports = db;
