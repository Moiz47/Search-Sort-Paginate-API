const router = require('express').Router();
const util = require('util');
const db = require('../Services/connection');
const query = util.promisify(db.query).bind(db);
const verifyToken = require('../Middleware/verify');

router.get('/user', verifyToken, (req, res) => {
    const {firstName, lastName, empId, sort, page, limit} = req.query;

    let userSearch = `SELECT userId, userFirstName, userLastName, email, e.organization, e.employeeId from user 
    JOIN employee e ON e.user_userId = userId` 

    if(firstName || lastName || empId ){
        let searchClause =
          " WHERE 1 = 1" +
          (firstName ? ` AND userFirstName = ?` : "") +
          (lastName ? ` AND userLastName = ?` : "") +
          (empId ? ` AND e.employeeId = ?` : "");
        userSearch += searchClause;
    }


    if(sort){
        let orderClause =
          " ORDER by " +
          (sort === "firstName"
            ? "userFirstName"
            : sort === "lastName"
            ? "userLastName"
            : sort === "email"
            ? "email"
            : sort === "empId"
            ? "e.employeeId"
            : sort === "organization"
            ? "e.organization"
            : "");
        userSearch += orderClause;
    }

    if(page && limit){
        const offset = ((+page - 1) * +limit);
        userSearch += ` LIMIT ? OFFSET ${offset}`;
    }
    
    let options = []
    if(firstName)
        options = [firstName]
    if(lastName)
        options = [...options, lastName]
    if(empId)
        options = [...options, empId]
    if(limit && page)
        options = [...options, +limit]

    const run = async() => {
        try{
            const getUsers = await query(userSearch, options);
            return res.status(200).json({users: getUsers}) 
        }catch(error){
            console.log(error);
            res.status(500).json({error: "Something went wrong"})
        }
    }

    run();
})


module.exports = router;