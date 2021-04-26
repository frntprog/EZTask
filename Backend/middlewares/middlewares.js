const Joi = require("@hapi/joi");
function validatePostTodo(req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
      task: Joi.string().min(3),
      subTask: Joi.string().min(3),
    }).options({ stripUnknown: true, abortEarly: false });
    const {
      error,
      value
    } = schema.validate(data);
    error ? req.body.error = error 
    : req.body = value;
    next();
}

module.exports = {validatePostTodo};