const { kelas: KelasModel, modepembelajaran: ModepembelajaranModel, matapelajaran: MatapelajaranModel, bab: BabModel } = require("../models");


/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        const matapelajaran = await MatapelajaranModel.findAll();

        return res.send({
            message: "Success",
            data: matapelajaran
                .map((matapelajaran) => ({
                    id: matapelajaran.id,
                    kelas_id: matapelajaran.kelas_id,
                    modepembelajaran_id: matapelajaran.modepembelajaran_id,
                    nama_mata_pelajaran: matapelajaran.nama_mata_pelajaran,
                    thumbnail_mata_pelajaran: matapelajaran.thumbnail_mata_pelajaran,
                    createdAt: matapelajaran.createdAt,
                    kelas_id: matapelajaran.kelas_id,
                    modepembelajaran_id: matapelajaran.modepembelajaran_id,
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
                model: ModepembelajaranModel,
                as: 'modepembelajaran',
                attributes: ["id", "nama_mode_pembelajaran", "deskripsi_mode_pembelajaran", "createdAt"],
                include: {
                    model: KelasModel,
                    as: 'kelas',
                    attributes: ["id", "nama"]
                },

            },
        });

        if (!matapelajaran) {
            return res.status(404).send({
                message: "matapelajaran not found",
                data: null,
            });
        }

        // const babData = matapelajaran.bab && matapelajaran.bab.length > 0 ?
        //     matapelajaran.bab.map((b) => ({
        //         id: b.id,
        //         nama_bab: b.nama_bab,
        //         thumbnail_bab: b.thumbnail_bab,
        //     })) :
        //     null;

        return res.send({
            message: "Success",
            data: {
                matapelajaran,
                // daftar_bab: babData
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = { index, showId };