'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    

     await queryInterface.bulkInsert('People', [{
       user_id:1,
       parcel_id:1,
       pathe:'https/files.'
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
