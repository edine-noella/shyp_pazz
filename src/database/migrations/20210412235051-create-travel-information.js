'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('travel_informations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      src_country: {
        type: Sequelize.STRING
      },
      dest_country: {
        type: Sequelize.STRING
      },
      src_place: {
        type: Sequelize.STRING
      },
      dest_place: {
        type: Sequelize.STRING
      },
      departure_time: {
        type: Sequelize.STRING
      },
      departure_date: {
        type: Sequelize.STRING
      },
      transport_mode: {
        type: Sequelize.STRING
      },
      space_avai: {
        type: Sequelize.STRING
      },
      ticket: {
        type: Sequelize.STRING
      },
      price_dist: {
        type: Sequelize.STRING
      },
      add_costs: {
        type: Sequelize.STRING
      },
      terms: {
        type: Sequelize.STRING
      },
      shypment_category: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('travel_informations');
  }
};