module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Kenny  the  Ninja',
        email: 'keny@gmail.com',
        password: 'test@123',
        username: 'kenny',
        phone: '078888888',
        country: 'Rwanda',
        userType: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
