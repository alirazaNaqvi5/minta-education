'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: '9940065c-d716-4673-a87c-6f70e2ee5f1d',
      name: 'Fox',
      /* 
      * The encrypted password is "fox" 
      * If you want to change the default password then go to the website https://www.devglan.com/online-tools/bcrypt-hash-generator
      * Then encrypt your string by 9 Rounds and paste here
      */
      password: '$2a$04$g0yYpLb.0yIxpfevHUW3VePTPPsnxlgHlpoijX4NkDB9Nviy8iG7G', 
      email: 'fox@example.com',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
