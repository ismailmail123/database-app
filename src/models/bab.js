'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bab extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            bab.hasMany(models.sub_bab, {
                foreigenkey: "bab_id",
                as: "subbab"
            })
            bab.belongsTo(models.matapelajaran, {
                foreigenkey: "mata_pelajaran_id",
                as: "matapelajaran"
            })
        }
    }
    bab.init({
        mata_pelajaran_id: DataTypes.INTEGER,
        nama_bab: DataTypes.STRING,
        thumbnail_bab: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'bab',
        underscored: true,
    });
    return bab;
};