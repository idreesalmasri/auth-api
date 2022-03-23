'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const {users} = require('./auth/models/index')
const bearerAuth=require("./auth/middleware/bearerAuth");
const v2Route=require('./auth/routes/v2.js');
const v1Route=require('./auth/routes/v1.js');
const signupRoute = require('./auth/routes/signup.js');
const signinRoute = require('./auth/routes/signin.js');
// const secretstuff = require('./auth/routes/secretstuff.js');

const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');
app.use(signupRoute);
app.use(signinRoute);
app.use('/api/v2',v2Route);
app.use('/api/v1',v1Route);
// app.use(secretstuff);
app.use(cors());



function start(port) {
    app.listen(port,()=>{
        console.log(`running on port ${port}`)
    })
}
app.get('/',(req,res)=>{
    res.send('home route')
})
app.get('/users',bearerAuth,async(req,res)=>{
    const usersAskedFor = await users.findAll();
    res.status(200).json(usersAskedFor);
})
app.use(errorHandler);
app.use('*',notFound);

module.exports = {
    app: app,
    start: start
}