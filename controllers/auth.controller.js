const { authenticate, Users } = require('../models/users');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
require('dotenv').config();
exports.signUp = async (req, res) => {
    try {
        const { user } = req.body;
        console.log({ user });
        const exists = await Users.findOne({
            where: { email: user.email },
        });
        if (exists)
            return res.status(403).json({
                error: 'User Already Exists',
            });
        const { id, email } = await Users.create(user);
        res.json({
            user: { id, email },
            message: 'SignUp Successful',
        });
    } catch (e) {
        return res.status(400).json({
            error: 'Could not create user',
            message: e.message,
        });
    }
};
exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email }, raw: true });
        console.log(user);
        if (!user)
            return res.status(401).json({
                error: 'User does not exist',
            });
        const auth = authenticate({ password, salt: user.salt }, user.password);
        if (!auth) {
            return res.status(401).json({
                error: 'Email/Password does not match',
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '2 days',
        });

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (e) {
        return res.status(400).json({
            error: 'Could not sigin at the moment',
            message: e.message,
        });
    }
};
exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
});
