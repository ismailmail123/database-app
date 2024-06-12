const { materi: MateriModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        const query = {
            attributes: {
                include: [
                    [
                        MateriModel.sequelize.literal(
                            `(SELECT SUM(progresses.xp) FROM progresses WHERE progresses.materi_id = materi.id)`
                        ),
                        "total_xp",
                    ],
                    [
                        MateriModel.sequelize.literal(
                            `(SELECT SUM(progresses.gold) FROM progresses WHERE progresses.materi_id = materi.id)`
                        ),
                        "total_gold",
                    ],
                ],
            },
        };

        const materi = await MateriModel.findAll(query);

        return res.send({
            message: "Success",
            data: materi.map((m) => ({
                id: m.id,
                sub_bab_id: m.sub_bab_id,
                nama_materi: m.nama_materi,
                thumbnail_materi: m.thumbnail_materi,
                tipe_materi: m.tipe_materi,
                is_completed: m.is_completed,
                createdAt: m.createdAt
            }))
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = { index };