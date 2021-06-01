'use strict';
const enums = require('../../helpers/enums');

const {accountStatus} = enums;

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shypatron extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Shypatron.init({
    userId: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    status: DataTypes.ENUM([accountStatus.ACTIVE,accountStatus.INACTIVE,accountStatus.IN_PROCESS])
  }, {
    sequelize,
    modelName: 'Shypatron',
  });
  return Shypatron;
};