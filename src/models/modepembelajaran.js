'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class modepembelajaran extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            modepembelajaran.hasMany(models.matapelajaran, {
                foreigenkey: "mode_pembelajaran_id",
                as: "matapelajaran"
            })
            modepembelajaran.belongsTo(models.kelas, {
                foreignKey: "kelas_id",
                as: "kelas"
            })
        }
    }
    modepembelajaran.init({
        kelas_id: DataTypes.INTEGER,
        nama_mode_pembelajaran: DataTypes.STRING,
        deskripsi_mode_pembelajaran: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'modepembelajaran',
        underscored: true,
    });
    return modepembelajaran;
};