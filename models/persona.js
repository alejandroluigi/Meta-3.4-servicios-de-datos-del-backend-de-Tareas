'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class Persona extends Model {
    
    static associate(models) {
      Persona.hasMany(models.Tarea, {
        foreignKey: 'personaId',
        as: 'tareas'
      });
    }
  }
  Persona.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};