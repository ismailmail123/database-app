'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('matapelajarans', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            kelas_id: {
                type: Sequelize.INTEGER
            },
            modepembelajaran_id: {
                type: Sequelize.INTEGER
            },
            nama_mata_pelajaran: {
                type: Sequelize.STRING
            },
            thumbnail_mata_pelajaran: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('matapelajarans');
    }
};