'use strict';

const express = require('express');
const allmodels = require('../models');
const router = express.Router();
const bearer=require("../middleware/bearerAuth");
const acl=require("../middleware/acl");
router.param('model',(req,res,next) =>{
    if (allmodels[req.params.model]) {
        req.model=allmodels[req.params.model]
        next();
    } else{
        next('model does not exist')
    }
})
router.post('/:model',bearer,acl('create'),createmodle);
router.get('/:model',bearer,acl('read'),getmodle);
router.get('/:model/:id',bearer,acl('read'),getOnemodle);
router.put('/:model/:id',bearer,acl('update'),updateOnemodle);
router.delete('/:model/:id',bearer,acl('delete'),deleteOnemodle);
// localhost:3000/food (body:{firstName:'razan',lastName:'quran'})
async function createmodle(req,res) {
    let newData = req.body;
    let createData = await req.model.createRecord(newData);
    res.status(201).json(createData);
}
async function getmodle(req,res) {
    let Data = await req.model.readRecord();
    res.status(200).json(Data);
}
async function getOnemodle(req,res) {
    let pid = parseInt(req.params.id);
    let data = await req.model.readRecord(pid);
    res.status(200).json(data);
}
async function updateOnemodle(req,res) {
    let updatedData = req.body;
    let pid = parseInt(req.params.id);
    let data = await req.model.updateRecored(updatedData,pid);
    // let updateThisEle = await food.findOne({where:{id:pid}});
    // let dish = await updateThisEle.update(updatedFood);
    res.status(201).json(data);
}
async function deleteOnemodle(req,res) {
    let pid = parseInt(req.params.id);
    let data = await req.model.deleteRecord(pid);
    res.status(204).json(data);
}
module.exports = router;