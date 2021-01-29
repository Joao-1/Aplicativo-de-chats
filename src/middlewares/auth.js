const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({ error: 'No token provided' });
    };

    const parts = authHeader.split(' ');

    if(!parts.length === 2) {
        return res.status(401).send({ error: 'Token error' });
    };

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.teste(scheme)) {
        return res.status(401).send({ error: 'Token malformatted'});
    };

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).send({ erro: 'Token invalided'});
        };

        req.userID = decoded.id;
        return next();
    });
};