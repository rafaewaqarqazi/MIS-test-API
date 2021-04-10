const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Patient extends Model {}
Patient.init(
    {
        mrno: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        name: DataTypes.STRING,
        father_name: DataTypes.STRING,
        dob: DataTypes.STRING,
        address: DataTypes.STRING,
        status: DataTypes.INTEGER,
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { modelName: 'patient', sequelize }
);

module.exports = { Patient };
