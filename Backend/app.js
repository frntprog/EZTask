const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
require('dotenv/config');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const todoRoute = require('./routes/todos');
const subTaskRoute = require('./routes/SubTasks');

app.use(cors());
app.use('/todo', todoRoute);
app.use('/subtask', subTaskRoute);
app.use('/auth', authRouter);

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
});

app.listen(3000);