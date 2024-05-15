const Transaction = require('../model/Transaction');

// Save a new transaction
const saveTransaction = async (amount, phone_number, status) => {
  try {
    const transaction = new Transaction({
      amount,
      phone_number,
      status,
    });
    await transaction.save();
    console.log('Transaction saved successfully.');
  } catch (error) {
    console.error('Error saving transaction:', error);
  }
};

// Retrieve all transactions
const getAllTransactions = async (req,res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error);
  }
 
};

// Update a transaction
const updateTransactionStatus = async (id, newStatus) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    console.log('Transaction updated successfully:', transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
  }
};

// Delete a transaction
const deleteTransaction = async (id) => {
  try {
    await Transaction.findByIdAndDelete(id);
    console.log('Transaction deleted successfully.');
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
};


module.exports = {
  saveTransaction,
  getAllTransactions,
  updateTransactionStatus,
  deleteTransaction,
}