'use strict';
const enums = require('../../helpers/enums');

const {
  travelTypes,IDTypes,transportType,transportMode,
  transportFrequency, maritialStatus
} = enums;

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShypCrew extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ShypCrew.init({
    userId:DataTypes.STRING,
    travelType: DataTypes.ENUM([travelTypes.INTERNATIONAL,travelTypes.LOCAL]),
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    IDType: DataTypes.ENUM([IDTypes.NATIONAL_ID,IDTypes.PASSPORT_ID]),
    IDNumber: DataTypes.STRING,
    scannedIDCopyUrl: DataTypes.STRING,
    residencyCountry: DataTypes.STRING,
    transiportType: DataTypes.ENUM([transportType.BUSINESS, transportType.INDIVIDUAL]),
    transiportMode: DataTypes.ENUM(
      [
        transportMode.AIR_PLAN,transportMode.BICYCLE,transportMode.BUS,
        transportMode.MIN_BUS,transportMode.MOTOR_CAR,transportMode.MOTOR_CYCLE,
        transportMode.PRIVATE_CAR,transportMode.SHIP,transportMode.TRAIN,
        transportMode.OTHERS
      ]),
    transiportFrequency: DataTypes.ENUM([
      transportFrequency.DAIRY,transportFrequency.WEEKLY,
      transportFrequency.MONTHLY,transportFrequency.ONCE_WHILE
    ]),
    profilePhotoUrl: DataTypes.STRING,
    maritialStatus: DataTypes.ENUM([
      maritialStatus.MARRIED,maritialStatus.SINGLE,maritialStatus.NOT_MENTIONED,
      maritialStatus.ENGAGED,maritialStatus.DIVORCED
    ])
  }, {
    sequelize,
    modelName: 'ShypCrew',
  });
  return ShypCrew;
};