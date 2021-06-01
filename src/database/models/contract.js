'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Contract.init({
   // contract_id: DataTypes.INTEGER,
    user_id: {
      type:DataTypes.INTEGER,
      primaryKey: true},
    parcel_id: DataTypes.INTEGER,
    pathe: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contract',
  });
  
  return Contract;
};