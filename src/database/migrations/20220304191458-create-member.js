'use strict';

const { findLastIndex } = require("lodash");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Members', {
      user: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true

      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        default:false
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        default:false
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
    await queryInterface.dropTable('Members');
  }
};