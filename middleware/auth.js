const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'NO token,authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        //console.log(decoded,'---10')
        req.user = decoded;
        next()
    }
    catch (err) {
        res.status(401).json({ error: err });
    }
};   

module.exports = auth;
  