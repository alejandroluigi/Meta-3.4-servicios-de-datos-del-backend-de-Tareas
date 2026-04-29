'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Personas', [
      {
        nombre: 'John',
        apellido: 'Doe',
        email: 'john.doe@example.com',
        createdAt: new Date("2026-04-07 11:00:00"),
        updatedAt: new Date("2026-04-07 11:00:00")
      },
      {
        nombre: 'Jane',
        apellido: 'Smith',
        email: 'jane.smith@example.com',
        createdAt: new Date("2026-04-07 11:00:00"),
        updatedAt: new Date("2026-04-07 11:00:00")
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Personas', {
      createdAt: new Date("2026-04-07 11:00:00"),
    }, {});
  },
};
