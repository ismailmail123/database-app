const { modepembelajaran: ModepembelajaranModel, matapelajaran: MatapelajaranModel } = require("../models");
const matapelajaran = require("../models/matapelajaran");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        // Build query to get Bab data


        const modepembelajaran = await ModepembelajaranModel.findAll();

        return res.send({
            message: "Success",
            data: modepembelajaran,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

const showId = async(req, res, _next) => {
    try {
        const { id } = req.params;
        const modepembelajaran = await ModepembelajaranModel.findByPk(id, {
            attributes: ["id", "nama_mode_pembelajaran", "deskripsi_mode_pembelajaran", "created_at"],
            include: {
                model: MatapelajaranModel,
                as: 'matapelajaran',
                attributes: ["id", "nama_mata_pelajaran", "thumbnail_mata_pelajaran"]
            }
        });

        if (!modepembelajaran) {
            return res.status(404).send({
                message: "modepembelajaran not found",
                data: null,
            });
        }

        const matapelajaranData = modepembelajaran.matapelajaran && modepembelajaran.matapelajaran.length > 0 ?
            modepembelajaran.matapelajaran.map((m) => ({
                id: m.id,
                nama_mata_pelajaran: m.nama_mata_pelajaran,
                thumbnail_mata_pelajaran: m.thumbnail_mata_pelajaran,
            })) :
            null;

        return res.send({
            message: "Success",
            data: {
                id: modepembelajaran.id,
                nama_mode_pembelajaran: modepembelajaran.nama_mode_pembelajaran,
                matapelajaran: matapelajaranData,
                created_at: modepembelajaran.created_at,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}


module.exports = { index, showId };