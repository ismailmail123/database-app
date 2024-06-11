'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class kelas extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            kelas.hasMany(models.modepembelajaran, {
                foreignKey: "kelas_id",
                as: "modepembelajaran"
            })
        }
    }
    kelas.init({
        nama: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'kelas',
        underscored: true,
    });
    return kelas;
};