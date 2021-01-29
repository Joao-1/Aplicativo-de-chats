const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');
require("dotenv-safe").config();

const User = require('../database/models/user');

module.exports = {
    async register(req, res) {
        const {name, email, senha} = req.body;
        try {
            if (await User.findOne({where: { email: email }})) {
                return res.status(400).send({ error: 'Email already exists' });
            };
            const {id} = await User.create({nick: name, email: email, password:senha});
            let token = jwt.sign({id: id}, process.env.SECRET, {
                expiresIn: 3600
            });
            return res.status(200).json({ auth: true, token: token});
        } catch(err) {
            console.log(err);
            return res.status(400).json({ err: 'Register Failed' });
        };  
    },
};