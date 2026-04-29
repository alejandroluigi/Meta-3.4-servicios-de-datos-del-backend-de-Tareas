'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Admin',
        email: 'admin@example.com',
        password: 'Super234' // Contraseña encriptada
      },
      {
        nombre: 'Alex',
        email: 'alex@test.com',
        password: '123456' // Contraseña encriptada
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuario', null, {});
  }
};
