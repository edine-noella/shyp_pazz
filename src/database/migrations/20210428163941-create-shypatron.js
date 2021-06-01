'use strict';

const { accountStatus } = require("../../helpers/enums");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shypatrons', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull:false
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false
      },
      country: {
        type: Sequelize.STRING,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM([accountStatus.ACTIVE,accountStatus.INACTIVE,accountStatus.IN_PROCESS]),
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
    await queryInterface.dropTable('Shypatrons');
  }
};