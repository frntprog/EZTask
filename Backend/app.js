const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const todoRoute = require('./routes/todos');

app.use(cors());
app.use('/todo', todoRoute);

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});

app.listen(3000);
