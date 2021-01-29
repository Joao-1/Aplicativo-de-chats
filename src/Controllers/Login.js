const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');
require("dotenv-safe").config();

const User = require('../database/models/user');

module.exports = {
    async login(req, res) {
        const {email, senha} = req.body;

        const user = await User.findOne({ where: { email: email} });
    
        if(!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        };
    
        if(!await bcrypt.compare(senha, user.password)) {
            return res.status(401).json({ error: 'Senha inválida' });
        };
        let token = jwt.sign({id: user.id}, process.env.SECRET, {
            expiresIn: 3600
        });
        res.status(200).json({ auth: true, token: token, nick: user.nick, user_id: user.id});
    },
};