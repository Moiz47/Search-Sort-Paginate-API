require("dotenv").config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const genPassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt, hash
    }
}


const verifyPassword = (password, hash, salt) => {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return verifyHash === hash
}


const generateToken = (user) => {
    const expiresIn = "1d";
    const payload = {
        ID: user.userId
    }
    
    const signedToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: expiresIn, algorithm: "HS256"})
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}


module.exports = { genPassword, verifyPassword, generateToken }