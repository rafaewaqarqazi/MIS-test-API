const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Vitals extends Model {}
Vitals.init(
    {
        name: DataTypes.STRING,
        status: DataTypes.INTEGER,
    },
    { modelName: 'vital', sequelize }
);

module.exports = { Vitals };
