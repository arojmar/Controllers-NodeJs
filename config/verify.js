const jwt = require('jsonwebtoken');
const key = require('./key.js').keyPass;

function verify (req, res, next){
    const token = req.header.tokenUp;
    console.log(token)
    jwt.verify({token}, key);
    console.log('Token verified!');
    next();
}

module.exports = verify;