'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const personas = await queryInterface.sequelize.query(`SELECT id, email FROM Personas;`);
    const rows = personas[0];

    const adminPersona = rows.find(p => p.email === 'admin@example.com');
    const alexPersona = rows.find(p => p.email === 'alex@test.com');
    const alePersona = rows.find(p => p.email === 'alejandro.lopez@uabc.edu.mx');
    const omarPersona = rows.find(p => p.email === 'omar.lopez@uabc.edu.mx');

    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('Super234', 10), // Contraseña encriptada
        rol:'USER',
        personaId: adminPersona.id,
        activo: true,
      },
      {
        nombre: 'Alex',
        email: 'alex@test.com',
        password: await bcrypt.hash('123456', 10), // Contraseña encriptada
        rol:'USER',
        personaId: alexPersona.id,
        activo: true,
      },
      {
        nombre: 'Alejandro',
        email: 'alejandro.lopez@uabc.edu.mx',
        password: await bcrypt.hash('Luig100', 10), // Contraseña encriptada
        rol:'ADMIN',
        personaId: alePersona.id,
        activo: true,
      },
      {
        nombre: 'Omar',
        email: 'omar.lopez@uabc.edu.mx',
        password: await bcrypt.hash('Y05h1you', 10), // Contraseña encriptada
        rol:'USER',
        personaId: omarPersona.id,
        activo: true,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
    /* */
  }
};
