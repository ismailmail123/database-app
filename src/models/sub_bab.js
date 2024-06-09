'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class sub_bab extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            sub_bab.hasMany(models.materi, {
                foreigenkey: "sub_bab_id",
                as: "materi"
            })
            sub_bab.belongsTo(models.bab, {
                foreignKey: "bab_id",
                as: "bab"
            })
        }
    }
    sub_bab.init({
        bab_id: DataTypes.INTEGER,
        nama_sub_bab: DataTypes.STRING,
        thumbnail_sub_bab: DataTypes.TEXT,
        is_free: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'sub_bab',
        underscored: true,
    });
    return sub_bab;
};