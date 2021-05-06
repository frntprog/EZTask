const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const {
    check
} = require('express-validator');
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/registration', [
    check('username', "The username can't be empty!").notEmpty(),
    check('password', "The password must be bigger that 4 and less than 10 characters").isLength(4, 10)
], controller.registration);

router.post('/login', controller.login);

router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;