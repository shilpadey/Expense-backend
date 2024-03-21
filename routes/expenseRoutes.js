const express = require('express');

const router = express.Router();

const expenseControls = require('../controllers/expenseControls');
const authmiddleware = require('../middleware/auth');

router.post('/add-expense', authmiddleware.authenticate, expenseControls.addExpense);
router.get('/get-expense', authmiddleware.authenticate, expenseControls.getExpense);
router.delete('/delete-expense/:expenseId', authmiddleware.authenticate, expenseControls.deleteExpense);


module.exports = router;