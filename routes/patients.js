const express = require('express');
const { requireSignin } = require('../controllers/auth.controller');
const {
    getAllPatients,
    createPatient,
    updatePatient,
    removePatient,
    getPatientById,
    createVital,
} = require('../controllers/patients.controller');
const router = express.Router();

router.get('/all', requireSignin, getAllPatients);
router.get('/one', requireSignin, getPatientById);
router.post('/create', requireSignin, createPatient);
router.put('/update', requireSignin, updatePatient);
router.put('/vital', requireSignin, createVital);
router.put('/remove', requireSignin, removePatient);

module.exports = router;
