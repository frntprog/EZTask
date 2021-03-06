const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

const {
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const {
    secret
} = require('../config');

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, {
        expiresIn: "30min"
    })
}

class authController {
    async registration(req, res) {
        console.log(req.body)
        try {
            const errors = validationResult(req);
            console.log(errors)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Error while registration",
                    errors
                })
            }
            const {
                username,
                password
            } = req.body;
            const candidate = await User.findOne({
                username
            });
            if (candidate) {
                return res.status(400).json({
                    message: "The user with such username already exists."
                })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({
                value: "USER"
            });
            const user = new User({
                username,
                password: hashPassword,
                roles: [userRole.value],
                todos: []
            });
            await user.save();
            return res.status(201).json({
                message: "The user was registrated"
            });
        } catch (e) {
            res.status(400).json({
                message: "Registration error!"
            });
        }
    }

    async login(req, res) {
        console.log(req.body)
        try {
            const {
                username,
                password
            } = req.body;
            const user = await User.findOne({
                username
            });
            if (!user) {
                return res.status(400).json({
                    message: `The user ${username} is not found`
                });
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    message: `The password is invalid`
                });
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({
                token
            });
        } catch (e) {
            res.status(400).json({
                message: "Registration error!"
            });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
            res.json("Server works!!!");
        } catch (e) {
            res.status(400).json({
                message: "Registration error!"
            });
        }
    }
}

module.exports = new authController();