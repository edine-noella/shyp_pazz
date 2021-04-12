module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
        name: 'Kenny  the  Ninja',
        email: 'keny@gmail.com',
        password: 'test@123',
        username: 'kenny',
        phone: '078888888',
        country: 'Rwanda',
        userType: 'STANDARD_USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};