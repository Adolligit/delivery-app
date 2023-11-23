const express = require('express');
const loginController = require('../controllers/login.controller');

const login = express();

login.post('/login', loginController.loginUser);

module.exports = login;
