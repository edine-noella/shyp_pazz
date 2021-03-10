module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'TestUsers',
    [
      {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: 'test@123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('TestUsers', null, {}),
};
