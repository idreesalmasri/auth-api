'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const foodRoute=require('./auth/routes/food.js')
const signupRoute = require('./auth/routes/signup.js');
const signinRoute = require('./auth/routes/signin.js');
// const secretstuff = require('./auth/routes/secretstuff.js');

const errorHandler = require('./middleware/500.js');
const notFound = require('./middleware/404.js');
app.use(signupRoute);
app.use(signinRoute);
app.use(foodRoute);
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
app.use(errorHandler);
app.use('*',notFound);

module.exports = {
    app: app,
    start: start
}