const router = require('express').Router();
const util = require('util');
const db = require('../Services/connection');
const query = util.promisify(db.query).bind(db);
const utilFunctions = require('../Services/util');

router.post('/register', async(req, res) => {
    const {firstName, lastName, email, password, employeeID, organization} = req.body;
    
    const checkUser = `SELECT email from user where email = ?`;
    const addUser = `INSERT INTO user (userFirstName, userLastName, email, hash, salt) VALUES (?, ?, ?, ?, ?)`
    const addEmployee = () => (`INSERT INTO employee (employeeId, organization, user_userId) VALUES (?, ?, ?)`)
    
    try {
        const checkIfUserExist = await query(checkUser, [email]);
        if(checkIfUserExist.length){
            return res.status(400).json({error: "Email already Exist"})
        }
        const saltHash = utilFunctions.genPassword(password);
        const addedUser = await query(addUser, [firstName, lastName, email, saltHash.hash, saltHash.salt]);
        await query(addEmployee(), [employeeID, organization, addedUser.insertId])
        res.status(200).json({msg: "User registered"})        
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Something went wrong"})
    }
})



router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    const checkIfUserExist = `SELECT userId, email, salt, hash from user where email = ?`

    try{
        const userExists = await query(checkIfUserExist, [email]);
        if(!userExists.length)
            return res.status(400).json({error: "User does not exists"})
        if(!utilFunctions.verifyPassword(password, userExists[0].hash, userExists[0].salt))
            return res.status(400).json({error: "Invalid credentials"})
        
        const token = utilFunctions.generateToken(userExists);
        return res.status(200).json({msg: "User logged in", ...token})        

        
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Something went wrong"})
    }


})



module.exports = router;
