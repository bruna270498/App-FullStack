'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('type_kitchens', [
    { 
      name_type: 'Filipino'
    },
    {
      name_type:'Japanese'
    },
    {
      name_type: 'Italian'
    },
    {
      name_type: 'Malaysian'
    },
    {
      name_type: 'Canadian'
    },
    {
      name_type: 'Indian'
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('type_kitchens', null, {});
  }
};
