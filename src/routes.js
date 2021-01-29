const express = require('express');
const authMiddleware = require('./middlewares/auth');
require("dotenv-safe").config();

const LoginController = require('./Controllers/Login');
const RegisterController = require('./Controllers/Register');

const routes = express.Router();

routes.get('/teste', (req, res) =>{
    return res.status(201).json({ oPaita: 'on' });
})
routes.post('/login', LoginController.login);
routes.post('/register', RegisterController.register);

module.exports = routes;