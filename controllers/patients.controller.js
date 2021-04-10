const { Patient } = require('../models/patient');
const { PATIENT_VITAL } = require('../models/patient_vital');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
require('dotenv').config();
exports.getAllPatients = async (req, res) => {
    try {
        const { perPage = 10, page = 1 } = req.query;
        const patients = await Patient.findAndCountAll({
            where: {
                status: 1,
            },
            offset: (parseInt(page) - 1) * parseInt(perPage),
            limit: parseInt(perPage),
        });
        res.json({
            count: patients.count,
            patients: patients.rows,
            message: 'Patients List',
        });
    } catch (e) {
        return res.status(400).json({
            error: 'Could not get patients',
            message: e.message,
        });
    }
};
exports.getPatientById = async (req, res) => {
    try {
        const { id } = req.query;
        const patient = await Patient.findOne({ where: { id: id, status: 1 } });
        if (!patient)
            return res.status(403).json({
                error: 'Patient does not Exists',
            });
        res.json({
            patient: patient,
            message: 'Patients List',
        });
    } catch (e) {
        return res.status(400).json({
            error: 'Could not get patients',
            message: e.message,
        });
    }
};
exports.createPatient = async (req, res) => {
    try {
        const { patient } = req.body;
        const exists = await Patient.findOne({
            where: { email: patient.email, status: 1 },
        });
        if (exists)
            return res.status(403).json({
                error: 'Patient Already Exists',
            });
        patient.status = 1;
        const { id, email, name, father_name } = await Patient.create(patient);
        res.json({
            user: { id, email, name, father_name },
            message: 'Patient created Successfully',
        });
    } catch (e) {
        return res.status(400).json({
            error: 'Could not create patient',
            message: e.message,
        });
    }
};
exports.updatePatient = async (req, res) => {
    try {
        const { patient } = req.body;
        const { temperature, weight, height, ...rest } = patient;
        const data = await Patient.findOne({
            where: { id: rest.id, status: 1 },
        });
        if (!data)
            return res.status(403).json({
                error: 'Patient Does not Exist!',
            });
        await Patient.update(rest, {
            where: {
                id: rest.id,
            },
        });
        if (weight) {
            await PATIENT_VITAL.create({
                mrno: data.mrno,
                vital_id: 1,
                value: weight,
            });
        }

        if (height) {
            await PATIENT_VITAL.create({
                mrno: data.mrno,
                vital_id: 2,
                value: height,
            });
        }

        if (temperature) {
            await PATIENT_VITAL.create({
                mrno: data.mrno,
                vital_id: 3,
                value: temperature,
            });
        }
        res.json({
            message: 'Patient Updated Successfully',
        });
    } catch (e) {
        return res.status(400).json({
            error: 'Could not update patient',
            message: e.message,
        });
    }
};
exports.removePatient = async (req, res) => {
    try {
        const { id } = req.query;
        const data = await Patient.findOne({
            where: { id },
        });
        if (!data)
            return res.status(403).json({
                error: 'Patient Does not Exist!',
            });
        await Patient.update(
            { status: 0 },
            {
                where: {
                    id: data.id,
                },
            }
        );
        res.json({
            message: 'Patient Deleted Successfully',
        });
    } catch (e) {
        return res.status(400).json({
            error: 'Could not update patient',
            message: e.message,
        });
    }
};
