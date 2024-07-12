const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'NO token,authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        //console.log(decoded,'---10')
        req.user = decoded;
        next()
    }
    catch (err) {
        res.status(401).json({ error: err });
    }
};   

module.exports = auth;
  