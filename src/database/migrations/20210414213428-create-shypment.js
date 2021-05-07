'use strict';
const  enums = require('../../helpers/enums');
const {
        travelTypes,IDTypes,transportType,transportMode,
        transportFrequency, maritialStatus,accountStatus
      } = enums;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ShypCrews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userId:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      travelType:{
        type: Sequelize.ENUM([travelTypes.INTERNATIONAL,travelTypes.LOCAL]),
        allowNull:false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false
      },
      IDType: {
        type: Sequelize.ENUM([IDTypes.NATIONAL_ID,IDTypes.PASSPORT_ID]),
        allowNull:false
      },
      IDNumber: {
        type: Sequelize.STRING,
        allowNull:false
      },
      scannedIDCopyUrl: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull:true
      },
      residencyCountry: {
        type: Sequelize.STRING,
        allowNull:false
      },
      transiportType: {
        type: Sequelize.ENUM([transportType.BUSINESS, transportType.INDIVIDUAL]),
        allowNull:false
      },
      transiportMode: {
        type: Sequelize.ENUM(
          [
            transportMode.AIR_PLAN,transportMode.BICYCLE,transportMode.BUS,
            transportMode.MIN_BUS,transportMode.MOTOR_CAR,transportMode.MOTOR_CYCLE,
            transportMode.PRIVATE_CAR,transportMode.SHIP,transportMode.TRAIN,
            transportMode.OTHERS
          ]),
          allowNull:false
      },
      transiportFrequency: {
        type: Sequelize.ENUM([
          transportFrequency.DAIRY,transportFrequency.WEEKLY,
          transportFrequency.MONTHLY,transportFrequency.ONCE_WHILE
        ]),
        allowNull:false
      },
      profilePhotoUrl: {
        type: Sequelize.STRING,
        default:null,
        allowNull:true
      },
      maritialStatus: {
        type: Sequelize.ENUM([
          maritialStatus.MARRIED,maritialStatus.SINGLE,maritialStatus.NOT_MENTIONED,
          maritialStatus.ENGAGED,maritialStatus.DIVORCED
        ]),
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM([accountStatus.ACTIVE, accountStatus.INACTIVE, accountStatus.IN_PROCESS]),
        defaultValue: accountStatus.ACTIVE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ShypCrews');
  }
};