const {
    Schema,
    model
} = require('mongoose');
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

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        ref: "Role"
    }],
    todos: [TodoSchema]

})

module.exports = model('User', User);