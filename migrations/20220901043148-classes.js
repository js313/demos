'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('classes', {
      standard: Sequelize.INTEGER,
      division: Sequelize.STRING
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
