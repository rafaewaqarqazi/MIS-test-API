const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class PATIENT_VITAL extends Model {}
PATIENT_VITAL.init(
    {
        mrno: DataTypes.INTEGER,
        vital_id: DataTypes.INTEGER,
        value: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
    },
    { modelName: 'patient_vital', sequelize }
);

module.exports = { PATIENT_VITAL };
