const express=require("express");
const router=express.Router();

const {callback} =require('../controllers/callbackController');



router.post('/',callback);


module.exports=router;