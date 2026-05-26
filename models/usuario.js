'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class Usuario extends Model {
    
    static associate(models) {
      // define association here
      Usuario.hasMany(models.Tarea, {
        foreignKey: 'usuarioId',
        as: 'tareas'
      });
      Usuario.belongsTo(models.Persona, {
        foreignKey: 'personaId',
        as: 'persona'
      });
      models.Persona.hasOne(Usuario, {
        foreignKey: 'personaId',
        as: 'usuario'
      });
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    personaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Personas',
        key: 'id'
      }
    },
    rol:{
      type: DataTypes.STRING,
      defaultValue:'USER'
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
    //tableName:'usuarios',
    tableName:'Usuarios',
    freezeTableName:true
  });
  return Usuario;
};
/* */