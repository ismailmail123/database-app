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
        }
    }
    progress.init({
        user_id: DataTypes.INTEGER,
        materi_id: DataTypes.INTEGER,
        status_progress: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'progress',
        underscored: true,
    });
    return progress;
};