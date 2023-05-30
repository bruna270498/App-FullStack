'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('type_kitchens', [
    { 
      name_type: 'Filipino'
    },
    {
      name_type:'Chinese'
    },
    {
      name_type: 'Italian'
    },
    {
      name_type: 'Brazilian'
    },
    {
      name_type: 'Canadian'
    },
    {
      name_type: 'British'
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('type_kitchens', null, {});
  }
};
