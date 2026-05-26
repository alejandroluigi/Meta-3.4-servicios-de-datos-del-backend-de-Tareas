'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tareas", [
      {
        titulo: "Tesis de Python",
        completada: false,
        createdAt: new Date("2026-04-09 20:40:00"),
        updatedAt: new Date("2026-04-09 20:40:00")
      },
      {
        titulo: "Aprender UNIX",
        completada: true,
        createdAt: new Date("2026-04-09 20:45:00"),
        updatedAt: new Date("2026-04-09 20:45:00")
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
  }
};
