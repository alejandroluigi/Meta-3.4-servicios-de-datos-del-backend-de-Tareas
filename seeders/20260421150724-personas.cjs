'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Personas', [
      {
        nombre:'Admin',
        apellido: 'Doe',
        email:'admin@example.com',
        createdAt: new Date("2026-04-07 11:00:00"),
        updatedAt: new Date("2026-04-07 11:00:00")
      },
      {
        nombre:'Alex',
        apellido: 'Smith',
        email:'alex@test.com',
        createdAt: new Date("2026-04-07 11:00:00"),
        updatedAt: new Date("2026-04-07 11:00:00")
      },
      {
        nombre:'Alejandro',
        apellido: 'Smith',
        email:'alejandro.lopez@uabc.edu.mx',
        createdAt: new Date("2026-04-07 11:00:00"),
        updatedAt: new Date("2026-04-07 11:00:00")
      },
      {
        nombre:'Omar',
        apellido: 'Smith',
        email:'omar.lopez@uabc.edu.mx',
        createdAt: new Date("2026-04-07 11:00:00"),
        updatedAt: new Date("2026-04-07 11:00:00")
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Personas', {
      createdAt: new Date("2026-04-07 11:00:00"),
    }, {}); /* */
  },
};
