const { sub_bab: Sub_babModel, progress: ProgressModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        // Build query to get sub_bab data
        const query = {
            attributes: {
                include: [
                    [
                        Sub_babModel.sequelize.literal(
                            `(SELECT ROUND(COUNT(*) / 1 * 100, 2) 
                             FROM progresses 
                             WHERE progresses.sub_bab_id = sub_bab.id 
                             AND progresses.status_progress = true)`
                        ),
                        "progress_bar",
                    ],
                ],
            },
        };

        const sub_bab = await Sub_babModel.findAll(query);

        return res.send({
            message: "Success",
            data: sub_bab.map((s) => {
                return {
                    id: s.id,
                    nama_sub_bab: s.nama_sub_bab,
                    thumbnail_sub_bab: s.thumbnail_sub_bab,
                    is_free: s.is_free,
                    progress_bar: s.get('progress_bar')
                }
            })
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = { index };