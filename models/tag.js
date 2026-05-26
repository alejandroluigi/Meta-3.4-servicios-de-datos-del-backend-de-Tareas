'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class Tag extends Model {
    
    static associate(models) {
      Tag.belongsToMany(models.Tarea, {
        through: 'TareaTag',
        foreignKey: 'TagId'
      });
    }
  }
  Tag.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};