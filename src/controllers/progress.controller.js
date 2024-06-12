const { progress: ProgressModel } = require("../models");
const { materi: MateriModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, next) => {
    try {
        const progress = await ProgressModel.findAll();

        return res.send({
            message: "Success",
            data: progress
                .map((p) => {

                    return {
                        id: p.id,
                        materi_id: p.materi_id,
                        status_progress: p.status_progress,
                        xp: p.xp,
                        gold: p.gold,
                    };
                }),
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const update = async(req, res, _next) => {
    try {
        const { id } = req.params;
        const { status_progress } = req.body;

        const progress = await ProgressModel.findByPk(id);

        if (!progress) {
            return res.status(404).send({
                message: "Progress not found",
                data: null,
            });
        }

        // Memeriksa nilai materi_id
        const materi_id = progress.materi_id;

        let xp, gold;

        if (status_progress === true && (materi_id === 2 || materi_id === 3)) {
            xp = 100;
            gold = 125;
        } else if (status_progress === true && (materi_id === 1 || materi_id === 4)) {
            xp = 50;
            gold = 100;
        } else {
            xp = 0;
            gold = 0;
        }

        // Memperbarui nilai progress termasuk xp dan gold
        await progress.update({
            status_progress,
            xp,
            gold,
        });

        // Mengecek apakah semua status_progress dengan materi_id yang sama bernilai true
        const allProgress = await ProgressModel.findAll({ where: { materi_id } });
        const allCompleted = allProgress.every(p => p.status_progress === true);

        if (allCompleted) {
            // Memperbarui kolom is_completed pada tabel materi
            await MateriModel.update({ is_completed: true }, { where: { id: materi_id } });
        }
        if (!allCompleted) {
            await MateriModel.update({ is_completed: false }, { where: { id: materi_id } });
        }

        return res.send({
            message: "Progress updated successfully",
            data: {
                id: progress.id,
                status_progress: progress.status_progress,
                xp: progress.xp,
                gold: progress.gold,
                createdAt: progress.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal Server Error",
            data: null,
        });
    }
};



module.exports = { index, update };