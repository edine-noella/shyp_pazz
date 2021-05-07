const { accountStatus } = require("../../helpers/enums");

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Shypatrons',
    [
      {
        id:'ea71bbf0-0e47-5432722021f7751912-fe27f32trye',
        userId: 'ea71bbf0-0e47-5432722021f7751912-fe27f38ace33',
        phone:'0785436974',
        address: 'KK 452 BE0',
        country: 'Rwanda',
        status: accountStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Shypatrons', null, {}),
};