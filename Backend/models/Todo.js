const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    edit: {
        type: Boolean,
        default: false
    },
    detailedInfo: []
})
module.exports = mongoose.model('Todos', TodoSchema)
