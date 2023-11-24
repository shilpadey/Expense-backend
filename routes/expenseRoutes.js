const express = require('express');

const router = express.Router();

const expenseControls = require('../controllers/expenseControls');

router.post('/add-expense', expenseControls.addExpense);
router.get('/get-expense', expenseControls.getExpense);
router.delete('/delete-expense/:expenseId', expenseControls.deleteExpense);


module.exports = router;