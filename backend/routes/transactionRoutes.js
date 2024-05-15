const express=require("express");
const router=express.Router();


const transactions=require('../controllers/transactions');


router.get('/',transactions.getAllTransactions);

module.exports=router;