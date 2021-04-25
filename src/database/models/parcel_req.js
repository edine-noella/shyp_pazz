'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class parcel_req extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  parcel_req.init({
    package_category: DataTypes.STRING,
    package_type: DataTypes.STRING,
    package_name: DataTypes.STRING,
    weight: DataTypes.STRING,
    image: DataTypes.STRING,
    src_address: DataTypes.STRING,
    dest_address: DataTypes.STRING,
    departure_time: DataTypes.STRING,
    arrival_time: DataTypes.STRING,
    transport_mode: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'parcel_req',
  });
  return parcel_req;
};