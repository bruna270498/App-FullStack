'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.createTable('type_kitchens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_type: {
        type: Sequelize.STRING,
        allowNull: false
      }
     });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('type_kitchens');
  }
};
