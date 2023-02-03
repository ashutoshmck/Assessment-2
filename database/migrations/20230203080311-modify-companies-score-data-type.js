'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn('Companies', 'score', {
        type: Sequelize.FLOAT,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn('Companies', 'score', {
        type: Sequelize.INTEGER,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
