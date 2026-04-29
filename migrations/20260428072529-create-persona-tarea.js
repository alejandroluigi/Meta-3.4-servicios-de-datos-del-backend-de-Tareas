'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('personas_tareas', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        PersonaId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Personas',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        TareaId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Tareas',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
           type: Sequelize.DATE
        }
      });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('personas_tareas');
  }
};
