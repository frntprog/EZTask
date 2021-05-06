const jwt = require('jsonwebtoken');
const {
    secret
} = require('../config');

module.exports = function (req, res, next) {
    if (req.methods === "OPIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({
                message: "The user is unauthorized"
            });
        }
        const decodedData = jwt.verify(token, secret);
        console.log(decodedData);
        req.user = decodedData;
        next();
    } catch (e) {
        return res.status(403).json({
            message: "The user is unauthorized"
        });
    }
}