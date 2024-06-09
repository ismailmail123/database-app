'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sub_babs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bab_id: {
                type: Sequelize.INTEGER
            },
            nama_sub_bab: {
                type: Sequelize.STRING
            },
            thumbnail_sub_bab: {
                type: Sequelize.TEXT
            },
            is_free: {
                type: Sequelize.BOOLEAN
            },
            created_at: {
                allowNull: false,
                defaultValue: Sequelize.fn("NOW"),
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                defaultValue: Sequelize.fn("NOW"),
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('sub_babs');
    }
};