'use strict';
const enums = require('../../helpers/enums');
const {userRoles} = enums;
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    country: DataTypes.STRING,
    username: DataTypes.STRING,
    userType: DataTypes.ENUM([userRoles.STANDARD,userRoles.ADMIN,userRoles.SHYP_CREW,userRoles.SHYP_PATRON])
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};