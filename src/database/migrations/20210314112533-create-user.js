'use strict';
const enums = require('../../helpers/enums');
const {userRoles} = enums;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      userType: {
        type: Sequelize.ENUM([userRoles.STANDARD,userRoles.ADMIN,userRoles.SHYP_CREW,userRoles.SHYP_PATRON]),
        defaultValue: userRoles.STANDARD
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      status:{
        type: Sequelize.ENUM(['ACTIVE','INACTIVE','IN_PROCESSS']),
        default: 'IN_PROCESS'
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
    await queryInterface.dropTable('Users');
  }
};