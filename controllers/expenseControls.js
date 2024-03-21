const Expense = require('../models/expense');
const User = require('../models/user');

const getExpense = (req, res, next) => {
    
         req.user.getExpense().then(expenses => {
            return res.status(200).json({expenses, success: true});
         }).catch ((err)=> {console.log(err)})
    
};

const addExpense = (req, res, next) => {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        /*try {
            const expense = await req.user.createExpense({
              amount: amount,
              description: description,
              category: category,
            });
            console.log('Record Added');
            res.json(expense);
        } catch (error) {
            console.log(error);
            res.json({});
        }*/


        req.user.createExpense({
            amount: amount,
            description: description,
            category: category,
        })
        .then((result) => {
            console.log(result)
            return res.status(201).json({result, success: true});
        }).catch((err)=> {
            return res.status(403).json({success: false, error: err});
        })
};

const deleteExpense = (req, res, next) => {
    t
        const expenseId = req.params.expenseId;
        Expense.destroy({where: {id: expenseId }}).then(() => {
            return res.status(204).json({success: true, message: "Delete Successfully"});
        }). catch((err) =>{
            console.log(err);
            res.status(404).json({success: false, message: 'You cant delete expesnes of others'});
        });
    
}

module.exports = {
    getExpense,
    addExpense,
    deleteExpense
}
