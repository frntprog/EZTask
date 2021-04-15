const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    task: Joi.string().min(3),
    completed: Joi.boolean().default(false),
    date: Joi.date().default(Date.now),
    edit: Joi.boolean().default(false)
})

module.exports = {
    schema
}
