const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  number:{
    type: Number,
    required: true,
  },
  trnx_Id:{
    type: String,
    required: true,
  },
  amount:{
    type: Number,
    required: true,
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Transaction', transactionSchema);
