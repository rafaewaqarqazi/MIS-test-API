const express = require('express');
const app = express();
const AuthRouter = require('./routes/auth');
const PatientRouter = require('./routes/patients');
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/db');
const { Vitals } = require('./models/vitals');

sequelize.sync();
Vitals.sync().then(() => {
    Vitals.findAll().then((res) => {
        console.log(res.length);
        if (res.length === 0) {
            Vitals.bulkCreate(
                [
                    {
                        name: 'WEIGHT',
                        status: 1,
                    },
                    {
                        name: 'HEIGHT',
                        status: 1,
                    },
                    {
                        name: 'TEMPERATURE',
                        status: 1,
                    },
                ],
                { updateOnDuplicate: ['name', 'id'] }
            );
        }
    });
});
app.use(express.json());
app.use('/api/auth', AuthRouter);
app.use('/api/patients', PatientRouter);
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
