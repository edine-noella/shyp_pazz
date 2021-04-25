'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('travel_informations', [{
        id: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
        src_country: 'rwanda',
        dest_country: 'rwanda',
        src_place:'',
        dest_place:'',  
        departure_time: '12:00',
        departure_date: '23-12-2200',
        transport_mode: 'car',
        space_avai: 'all boot',
        ticket: 'https:ei.pdf',
        price_dist:'3000',
        add_costs: '',
        terms:'https:form.html',
        shypment_category:'local',
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {await queryInterface.bulkDelete('travel_informations', null, {});
   
  }
};
