require("dotenv");
const express = require('express');
const app = express();
const db = require('./Services/connection');
const authRoutes = require('./routes/auth');
const user = require('./routes/user')

app.use(express.json())
app.use('/api/auth', authRoutes);
app.use('/api', user);

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('registration DB connected...');
});


app.listen(5000, () => {
    console.log("server is running")
})