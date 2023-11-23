require('express-async-errors');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.use('/auth', routes.login);
app.use('/admin', routes.admin);
app.use('/user', routes.user);
app.use('/register', routes.register);
app.use('/customer', routes.customer);
app.use('/seller', routes.seller);

app.use(errorMiddleware);

module.exports = app;
