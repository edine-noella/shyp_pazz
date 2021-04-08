module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PasswordResets',
    [
      {
        userId: Math.floor((1 + Math.random()) * 0x10000),
        code: 100344,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PasswordResets', null, {}),
};
