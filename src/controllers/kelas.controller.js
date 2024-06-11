const { kelas: KelasModel, modepembelajaran: ModepembelajaranModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        // Build query to get Bab data


        const kelas = await KelasModel.findAll({
            attributes: ["id", "nama", "created_at"],
            include: "modepembelajaran",
        });

        return res.send({
            message: "Success",
            data: kelas.map((kelas) => ({
                id: kelas.id,
                nama: kelas.nama,
                modepembelajaran: {
                    id: kelas.modepembelajaran.id,

                }
            }))
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

// const showId = async(req, res, _next) => {
//     const { id } = req.params;
//     const kelas = await KelasModel.findByPk(id, {
//         attributes: ["id", "nama", "created_at"],
//         include: "modepembelajaran",

//     });
//     if (!kelas) {
//         return res.status(404).send({
//             message: "Kelas not found",
//             data: null,
//         });
//     }

//     return res.send({
//         message: "Success",
//         data: {
//             id: kelas.id,
//             nama: kelas.nama,
//             modepembelajaran: {
//                 id: kelas.modepembelajaran.id,
//             },
//             created_at: kelas.created_at,
//         },
//     });
// }
const showId = async(req, res, _next) => {
    try {
        const { id } = req.params;
        const kelas = await KelasModel.findByPk(id, {
            attributes: ["id", "nama", "created_at"],
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

        return res.send({
            message: "Success",
            data: {
                id: kelas.id,
                nama: kelas.nama,
                modepembelajaran: {
                    id: kelas.modepembelajaran.id,
                    nama_mode_pembelajaran: kelas.modepembelajaran.nama_mode_pembelajaran,
                    deskripsi_mode_pembelajaran: kelas.modepembelajaran.deskripsi_mode_pembelajaran,
                },
                created_at: kelas.created_at,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = { index, showId };