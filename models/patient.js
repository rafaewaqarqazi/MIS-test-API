const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const { PATIENT_VITAL } = require('./patient_vital');
const { Vitals } = require('./vitals');

class Patient extends Model {}
Patient.init(
    {
        mrno: DataTypes.INTEGER,
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
    {
        modelName: 'patient',
        sequelize,
    }
);
Patient.belongsToMany(Vitals, {
    through: {
        model: PATIENT_VITAL,
        unique: false,
    },
    foreignKey: 'mrno',
    otherKey: 'vital_id',
    constraints: false,
});
Vitals.belongsToMany(Patient, {
    through: {
        model: PATIENT_VITAL,
        unique: false,
    },
    foreignKey: 'vital_id',
    otherKey: 'mrno',
    constraints: false,
});
PATIENT_VITAL.belongsTo(Patient, { foreignKey: 'mrno', unique: false });
PATIENT_VITAL.belongsTo(Vitals, { foreignKey: 'vital_id', unique: false });
Patient.hasMany(PATIENT_VITAL, {
    foreignKey: 'mrno',
    unique: false,
});
Vitals.hasMany(PATIENT_VITAL, { foreignKey: 'vital_id', unique: false });
module.exports = { Patient };
