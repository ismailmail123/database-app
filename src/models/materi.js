'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class materi extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            materi.hasMany(models.progress, {
                foreigenkey: "materi_id",
                as: "progress"
            })
            materi.belongsTo(models.sub_bab, {
                foreigenkey: "sub_bab_id",
                as: "sub_bab"
            })
        }
    }
    materi.init({
        sub_bab_id: DataTypes.INTEGER,
        nama_materi: DataTypes.STRING,
        thumbnail_materi: DataTypes.TEXT,
        tipe_materi: DataTypes.STRING,
        is_completed: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'materi',
        underscored: true,
    });
    return materi;
};