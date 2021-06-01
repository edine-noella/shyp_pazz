'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WithdrawStatistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Income: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      withdrawAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      bankName: {
        type: Sequelize.STRING
      },
      bankLocation: {
        type: Sequelize.STRING
      },
      bankAccName: {
        type: Sequelize.STRING
      },
      bankAccNumber: {
        type: Sequelize.FLOAT
      },
      MomoName: {
        type: Sequelize.STRING
      },
      MomoLocation: {
        type: Sequelize.STRING
      },
      MomoAccNumber: {
        type: Sequelize.FLOAT
      },
      AmazonMoney: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('WithdrawStatistics');
  }
};