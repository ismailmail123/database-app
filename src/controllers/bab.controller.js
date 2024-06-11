const { bab: BabModel, progress: ProgressModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        // Build query to get Bab data
        const query = {
            attributes: {
                include: [
                    [
                        BabModel.sequelize.literal(
                            `(SELECT ROUND(COUNT(*) / 4 * 100, 2) 
                             FROM progresses 
                             WHERE progresses.bab_id = bab.id 
                             AND progresses.status_progress = true)`
                        ),
                        "progress_bar",
                    ],
                    [
                        BabModel.sequelize.literal(
                            `(SELECT SUM(is_free) FROM sub_babs WHERE sub_babs.bab_id = bab.id)`
                        ),
                        "total_is_free",
                    ],
                ],
            },
        };


        const bab = await BabModel.findAll(query);

        return res.send({
            message: "Success",
            data: bab.map((b) => {
                return {
                    id: b.id,
                    nama_bab: b.nama_bab,
                    thumbnail_bab: b.thumbnail_bab,
                    progress_bar: b.get("progress_bar"),
                    total_is_free: b.get("total_is_free")
                }
            })
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = { index };