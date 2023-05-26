'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('categories', [
      {
        category: 'Beef',
      },
      {
        category: 'Chicken',
      },
      {
        category: 'Dessert',
      },
      {
        category: 'Pasta',
      },
      {
        category: 'Breakfast',
      },
      {
        category: 'Vegetarian',
      }
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
