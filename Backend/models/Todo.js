const mongoose = require('mongoose');

const SubTask = mongoose.Schema({
    subTask: {
        require: true,
        type: String
    }
})

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
    subTasks: [SubTask]
})

module.exports = mongoose.model('Todos', TodoSchema)