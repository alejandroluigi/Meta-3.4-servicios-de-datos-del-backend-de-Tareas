'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class Tarea extends Model {
    
    static associate(models) {
      Tarea.belongsTo(models.Persona, {
        foreignKey: 'personaId',
        as: 'persona'
      });

      Tarea.belongsToMany(models.Tag, {
        through: 'TareaTag',
        foreignKey: 'TareaId'
      });
      
      Tarea.belongsTo(models.Usuario,{
        foreignKey:'usuarioId',
        as:'usuario'
      });
    }
  }
  Tarea.init({
    titulo: DataTypes.STRING,
    personaId:{
      type:DataTypes.INTEGER
    },
    usuarioId:{
      type:DataTypes.INTEGER
    },
    completada: DataTypes.BOOLEAN
    
  }, {
    sequelize,
    modelName: 'Tarea',
  });
  return Tarea;
};