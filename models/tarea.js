'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tarea.belongsToMany(models.Persona, {
        through: 'PersonaTarea',
        foreignKey: 'tareaId'
      });

      Tarea.belongsToMany(models.Tag, {
        through: 'TareaTag',
        foreignKey: 'tareaId'
      });
      
      Tarea.belongsTo(models.Usuario,{
        foreignKey:'usuarioId',
        as:'usuario'
      });
    }
  }
  Tarea.init({
    titulo: DataTypes.STRING,
    completada: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tarea',
  });
  return Tarea;
};