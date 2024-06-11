const { materi: MateriModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        // Build query to get materi data
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
            data: materi
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = { index };