'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FileMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FileMessage.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FileMessage',
  });
  return FileMessage;
};