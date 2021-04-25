'uge strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('parcel_reqs', [{
        id: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
        package_category:"plastick",
        package_type:"home applience",
        package_name:"plate",
        weight:"12",
        image:"https/url.rw",
        src_address:"kigali",
        dest_address:"rubavu",
        departure_time:"8:00 am",
        arrival_time:"19:00 pm",
        transport_mode:"road transport",
        user_id:"1",
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {await queryInterface.bulkDelete('parcel_reqs', null, {});
   
  }
};
