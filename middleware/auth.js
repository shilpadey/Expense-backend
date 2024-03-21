const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        User.findByPk(user.id).then((user) => {
            req.user = user,
            next()
        });

    }catch(error) {
        console.log(error.message);
        
        return res.status(401).json({ message: error.message });
    }
};

module.exports = { authenticate };
