'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class matapelajaran extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            matapelajaran.hasMany(models.bab, {
                foreignKey: "mata_pelajaran_id",
                as: "bab"
            })
            matapelajaran.belongsTo(models.modepembelajaran, {
                foreigenkey: "mode_pembelajaran_id",
                as: "modepembelajaran"
            })
        }
    }
    matapelajaran.init({
        mode_pembelajaran_id: DataTypes.INTEGER,
        nama_mata_pelajaran: DataTypes.STRING,
        thumbnail_mata_pelajaran: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'matapelajaran',
        underscored: true,
    });
    return matapelajaran;
};