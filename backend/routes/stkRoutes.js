const express=require("express");
const router=express.Router();
const {createToken}=require('../controllers/token');
const {stkPush} =require('../controllers/stkController')

router.post('/',createToken,stkPush);


module.exports=router;
