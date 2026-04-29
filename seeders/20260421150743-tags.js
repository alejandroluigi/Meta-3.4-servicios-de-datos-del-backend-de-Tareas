'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tags", [
      {
        nombre: "Electrónica",
        createdAt: new Date("2026-04-09 20:16:00"),
        updatedAt: new Date("2026-04-09 20:16:00")
      },
      {
        nombre: "Portátil",
        createdAt: new Date("2026-04-09 20:20:00"),
        updatedAt: new Date("2026-04-09 20:20:00")
      },
      {
        nombre: "Presentación",
        createdAt: new Date("2026-04-09 20:30:00"),
        updatedAt: new Date("2026-04-09 20:30:00")
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tags", {
      createdAt: new Date("2026-04-09 20:40:00"),
    }, {});
  }
};
