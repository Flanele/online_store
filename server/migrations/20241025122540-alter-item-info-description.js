'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('item_infos', 'description', {
            type: Sequelize.TEXT,
            allowNull: false
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('item_infos', 'description', {
            type: Sequelize.STRING(255),
            allowNull: false
        });
    }
};
