'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WithdrawStatistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WithdrawStatistics.init({
    Income: DataTypes.FLOAT,
    withdrawAmount: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    bankName: DataTypes.STRING,
    bankLocation: DataTypes.STRING,
    bankAccName: DataTypes.STRING,
    bankAccNumber: DataTypes.FLOAT,
    MomoName: DataTypes.STRING,
    MomoLocation: DataTypes.STRING,
    MomoAccNumber: DataTypes.FLOAT,
    AmazonMoney: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'WithdrawStatistics',
  });
  return WithdrawStatistics;
};