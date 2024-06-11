'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class progress extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            progress.belongsTo(models.user, {
                foreigenkey: "user_id",
                as: "user"
            })
            progress.belongsTo(models.materi, {
                foreigenkey: "materi_id",
                as: "materi"
            })
            progress.belongsTo(models.bab, {
                foreigenkey: "bab_id",
                as: "bab"
            })
            progress.belongsTo(models.sub_bab, {
                foreigenkey: "sub_bab_id",
                as: "sub_bab"
            })
        }
    }
    progress.init({
        user_id: DataTypes.INTEGER,
        materi_id: DataTypes.INTEGER,
        sub_bab_id: DataTypes.INTEGER,
        bab_id: DataTypes.INTEGER,
        status_progress: DataTypes.BOOLEAN,
        xp: DataTypes.INTEGER,
        gold: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'progress',
        underscored: true,
    });
    return progress;
};