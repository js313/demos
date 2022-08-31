'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('students', {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      age: Sequelize.INTEGER
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
