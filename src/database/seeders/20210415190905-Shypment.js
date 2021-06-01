const enums = require('../../helpers/enums');
const {
     userRoles,transportFrequency,transportMode,
     transportType,IDTypes,travelTypes,
     maritialStatus
     } = enums;
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'ShypCrews',
    [
      {
        userId: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
        travelType:travelTypes.LOCAL,
        phone:'0785436974',
        address: 'KK 452 BE0',
        IDType: IDTypes.NATIONAL_ID,
        IDNumber: '19921930984628563',
        scannedIDCopyUrl: '',
        residencyCountry: 'Rwanda',
        transiportType: transportType.INDIVIDUAL,
        transiportMode: transportMode.BUS,
        transiportFrequency: transportFrequency.DAIRY,
        profilePhotoUrl: '',
        maritialStatus: maritialStatus.ENGAGED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ShypCrews', null, {}),
};