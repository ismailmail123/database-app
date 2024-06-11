const { matapelajaran: MatapelajaranModel, progress: ProgressModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        // Build query to get Bab data


        const matapelajaran = await MatapelajaranModel.findAll();

        return res.send({
            message: "Success",
            data: matapelajaran,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = { index };