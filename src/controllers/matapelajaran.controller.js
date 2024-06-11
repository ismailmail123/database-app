const { matapelajaran: MatapelajaranModel, bab: BabModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        // Build query to get Bab data


        const matapelajaran = await MatapelajaranModel.findAll({
            attributes: ["id", "nama_mata-pelajaran", "thumbnail_mata_pelajaran", "createdAt"],
            include: "bab",
        });

        return res.send({
            message: "Success",
            data: matapelajaran.map((matapelajaran) => ({
                id: matapelajaran.id,
                nama_mata_pelajaran: matapelajaran.nama_mata_pelajaran,
                thumbnail_mata_pelajaran: matapelajaran.thumbnail_mata_pelajaran,
                createdAt: matapelajaran.createdAt,
            }))
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};


const showId = async(req, res, _next) => {
    try {
        const { id } = req.params;
        const matapelajaran = await MatapelajaranModel.findByPk(id, {
            attributes: ["id", "nama_mata_pelajaran", "thumbnail_mata_pelajaran", "createdAt"],
            include: {
                model: BabModel,
                as: 'bab',
                attributes: ["id", "nama_bab", "thumbnail_bab"]
            }
        });

        if (!matapelajaran) {
            return res.status(404).send({
                message: "matapelajaran not found",
                data: null,
            });
        }

        const babData = matapelajaran.bab && matapelajaran.bab.length > 0 ?
            matapelajaran.bab.map((b) => ({
                id: b.id,
                nama_bab: b.nama_bab,
                thumbnail_bab: b.thumbnail_bab,
            })) :
            null;

        return res.send({
            message: "Success",
            data: {
                id: matapelajaran.id,
                nama_mata_pelajaran: matapelajaran.nama_mata_pelajaran,
                daftar_bab: babData,
                createdAt: matapelajaran.createdAt,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = { index, showId };