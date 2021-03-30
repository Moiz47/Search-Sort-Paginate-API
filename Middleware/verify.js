require("dotenv").config();
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token)
        return res.status(401).json({error: "could not authenticate"});

    try{
       jwt.verify(token.split(' ')[1], process.env.JWT_ACCESS_TOKEN_SECRET)
       next(); 
    }catch(error){
        return res.status(401).json({error: "Failed to access resource"})
    }

}

module.exports = verifyToken