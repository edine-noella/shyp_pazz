'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class travel_information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  travel_information.init({
    src_country: DataTypes.STRING,
    dest_country: DataTypes.STRING,
    src_place: DataTypes.STRING,
    dest_place: DataTypes.STRING,
    departure_time: DataTypes.STRING,
    departure_date: DataTypes.STRING,
    transport_mode: DataTypes.STRING,
    space_avai: DataTypes.STRING,
    ticket: DataTypes.STRING,
    price_dist: DataTypes.STRING,
    add_costs: DataTypes.STRING,
    terms: DataTypes.STRING,
    shypment_category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'travel_information',
  });
  return travel_information;
};