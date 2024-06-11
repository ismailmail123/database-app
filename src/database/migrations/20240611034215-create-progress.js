'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('progresses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            materi_id: {
                type: Sequelize.INTEGER
            },
            sub_bab_id: {
                type: Sequelize.INTEGER
            },
            bab_id: {
                type: Sequelize.INTEGER
            },
            status_progress: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            xp: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            gold: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
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
        await queryInterface.dropTable('progresses');
    }
};