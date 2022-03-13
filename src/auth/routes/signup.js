'use strict';
const express = require('express');
const {users} = require('../models/index');
const routers = express.Router();
const bcrypt = require('bcrypt');

routers.post('/signup', signupFunc);

async function signupFunc(req, res) {
    
    let { username, password ,role} = req.body;
    // let username=req.body.username;
    // let password=req.body.password;
    try {
        let hashedPassword = await bcrypt.hash(password, 5);
        
        const newUser = await users.create({
            username: username,
            password: hashedPassword,
            role:role
        })
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
    }
}
module.exports = routers;