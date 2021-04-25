'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parcel_reqs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      package_category: {
        type: Sequelize.STRING
      },
      package_type: {
        type: Sequelize.STRING
      },
      package_name: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      src_address: {
        type: Sequelize.STRING
      },
      dest_address: {
        type: Sequelize.STRING
      },
      departure_time: {
        type: Sequelize.STRING
      },
      arrival_time: {
        type: Sequelize.STRING
      },
      transport_mode: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue:new Date()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue:new Date()
      }
    }
    
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parcel_reqs');
  }
};