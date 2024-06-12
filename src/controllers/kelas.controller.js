const { kelas: KelasModel, modepembelajaran: ModepembelajaranModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        const kelas = await KelasModel.findAll({
            attributes: ["id", "nama", "createdAt"],
            include: "modepembelajaran",
        });

        return res.send({
            message: "Success",
            data: kelas.map((kelas) => ({
                id: kelas.id,
                nama: kelas.nama,
                createdAt: kelas.createdAt,
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
        const kelas = await KelasModel.findByPk(id, {
            attributes: ["id", "nama", "createdAt"],
            include: {
                model: ModepembelajaranModel,
                as: 'modepembelajaran',
                attributes: ["id", "nama_mode_pembelajaran", "deskripsi_mode_pembelajaran"]
            }
        });

        if (!kelas) {
            return res.status(404).send({
                message: "Kelas not found",
                data: null,
            });
        }

        const kelasData = kelas.modepembelajaran && kelas.modepembelajaran.length > 0 ?
            kelas.modepembelajaran.map((m) => ({
                id: m.id,
                nama_mode_pembelajaran: m.nama_mode_pembelajaran,
                deskripsi_mode_pembelajaran: m.deskripsi_mode_pembelajaran,
            })) :
            null;

        return res.send({
            message: "Success",
            data: {
                id: kelas.id,
                nama: kelas.nama,
                modepembelajaran: kelasData,
                createdAt: kelas.createdAt,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = { index, showId };