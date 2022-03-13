'use strict';

const express = require('express');
const {food} = require('../models/index');
const router = express.Router();
const bearer=require("../middleware/bearerAuth");
const acl=require("../middleware/acl");

router.post('/food',bearer,acl('create'),createFood);
router.get('/food',bearer,acl('read'),getFood);
router.get('/food/:id',bearer,acl('read'),getOneFood);
router.put('/food/:id',bearer,acl('update'),updateOneFood);
router.delete('/food/:id',bearer,acl('delete'),deleteOneFood);
// localhost:3000/food (body:{firstName:'razan',lastName:'quran'})
async function createFood(req,res) {
    let newFood = req.body;
    let dish = await food.createRecord(newFood);
    res.status(201).json(dish);
}
async function getFood(req,res) {
    let Food = await food.readRecord();
    res.status(200).json(Food);
}
async function getOneFood(req,res) {
    let pid = parseInt(req.params.id);
    let dish = await food.readRecord(pid);
    res.status(200).json(dish);
}
async function updateOneFood(req,res) {
    let updatedFood = req.body;
    let pid = parseInt(req.params.id);
    let dish = await food.updateRecored(updatedFood,pid);
    // let updateThisEle = await food.findOne({where:{id:pid}});
    // let dish = await updateThisEle.update(updatedFood);
    res.status(201).json(dish);
}
async function deleteOneFood(req,res) {
    let pid = parseInt(req.params.id);
    let dish = await food.deleteRecord(pid);
    res.status(204).json(dish);
}
module.exports = router;