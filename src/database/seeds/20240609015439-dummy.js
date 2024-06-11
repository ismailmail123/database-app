"use strict";

const {
    kelas,
    modepembelajaran,
    matapelajaran,
    bab,
    sub_bab,
    materi,
    progress,
    user
} = require("../../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} _Sequelize
     */
    async up(queryInterface, _Sequelize) {
        await kelas.destroy({ truncate: true });
        await modepembelajaran.destroy({ truncate: true });
        await matapelajaran.destroy({ truncate: true });
        await bab.destroy({ truncate: true });
        await sub_bab.destroy({ truncate: true });
        await materi.destroy({ truncate: true });
        await progress.destroy({ truncate: true });
        await user.destroy({ truncate: true });

        await queryInterface.bulkInsert("kelas", [
            { id: 1, nama: "Kelas 1" },
            { id: 2, nama: "Kelas 2" },
        ]);

        await queryInterface.bulkInsert("modepembelajarans", [
            { id: 1, kelas_id: 1, nama_mode_pembelajaran: "Pembelajaran Tematik", deskripsi_mode_pembelajaran: "ini adalah pembelajaran tematik" },
            { id: 2, kelas_id: 1, nama_mode_pembelajaran: "Pembelajaran Menurut Topik", deskripsi_mode_pembelajaran: "ini adalah pembelajaran menurut topik" },
            { id: 3, kelas_id: 1, nama_mode_pembelajaran: "Kurikulum Merdeka", deskripsi_mode_pembelajaran: "ini adalah pembelajaran kurikulum merdeka" },
        ]);

        await queryInterface.bulkInsert("matapelajarans", [
            { id: 1, modepembelajaran_id: 1, nama_mata_pelajaran: "BHS. Indonesia", thumbnail_mata_pelajaran: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y" },
            { id: 2, modepembelajaran_id: 1, nama_mata_pelajaran: "Matematika", thumbnail_mata_pelajaran: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y" },
            { id: 3, modepembelajaran_id: 1, nama_mata_pelajaran: "IPA", thumbnail_mata_pelajaran: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y" },
        ]);

        await queryInterface.bulkInsert("babs", [
            { id: 1, matapelajaran_id: 1, nama_bab: "bilangan 0-10", thumbnail_bab: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y" },
            { id: 2, matapelajaran_id: 1, nama_bab: "geometri dan pola", thumbnail_bab: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y" },
            { id: 3, matapelajaran_id: 1, nama_bab: "geometri dan pola 2", thumbnail_bab: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y" },
            { id: 4, matapelajaran_id: 1, nama_bab: "bilangan 21-40", thumbnail_bab: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y" },
        ]);

        await queryInterface.bulkInsert("sub_babs", [
            { id: 1, bab_id: 1, nama_sub_bab: "mengenal bilangan 1-10 (1)", thumbnail_sub_bab: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y", is_free: false },
            { id: 2, bab_id: 1, nama_sub_bab: "mengenal bilangan 1-10 (2)", thumbnail_sub_bab: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y", is_free: true },
            { id: 3, bab_id: 1, nama_sub_bab: "lebih besar lebih kecil 1-10", thumbnail_sub_bab: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y", is_free: true },
            { id: 4, bab_id: 1, nama_sub_bab: "bermain dengan bilangan", thumbnail_sub_bab: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y", is_free: false },
        ]);

        await queryInterface.bulkInsert("materis", [
            { id: 1, sub_bab_id: 1, nama_materi: "video", thumbnail_materi: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y", tipe_materi: "video" },
            { id: 2, sub_bab_id: 2, nama_materi: "quiz", thumbnail_materi: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y", tipe_materi: "quiz" },
            { id: 3, sub_bab_id: 3, nama_materi: "end quiz", thumbnail_materi: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y", tipe_materi: "end quiz" },
            { id: 4, sub_bab_id: 4, nama_materi: "summary", thumbnail_materi: "https://youtu.be/sSLJx5t4OJ4?si=3JaC9WO0zuKfBV3Y", tipe_materi: "summary" },
        ]);

        await queryInterface.bulkInsert("progresses", [
            { id: 1, user_id: 1, materi_id: 1, sub_bab_id: 1, bab_id: 1 },
            { id: 2, user_id: 1, materi_id: 2, sub_bab_id: 2, bab_id: 1 },
            { id: 3, user_id: 1, materi_id: 3, sub_bab_id: 3, bab_id: 1 },
            { id: 4, user_id: 1, materi_id: 4, sub_bab_id: 4, bab_id: 1 },
        ]);

        await queryInterface.bulkInsert("users", [{
            id: 1,
            nama: "John Doe",
            email: "test@example.com",
            password: "$2a$12$.HOb8SlLxGN4usHDihNaQe6IFDodXO09pO6Nfi.M96XzcTJ9F1HDu",
        }, ]);


    },
    /**
     * @param {import('sequelize').QueryInterface} _queryInterface
     * @param {import('sequelize').Sequelize} _Sequelize
     */
    async down(_queryInterface, _Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};