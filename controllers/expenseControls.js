const Expense = require('../models/expense');

exports.getExpense = async(req, res, next) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (err) {
        console.log(err);
    }
};

exports.addExpense = (req, res, next) => {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        /*if(amount == '' || description == '' || category == ''){
            res.json({ error: 'Please fill details'});
        }*/

        Expense.create({
            amount: amount,
            description: description,
            category: category,
        })
        .then((result) => {
            console.log(result)
            res.status(201).json(result);
        }).catch((err)=> {
        console.log(err);
        })
};

exports.deleteExpense = async(req, res, next) => {
    try {
        const expenseId = req.params.expenseId;
        const noOfRows = await Expense.destroy({where: {id: expenseId }})
        if(noOfRows === 0) {
            res.status(404).json({success: false, message: 'You cant delete expesnes of others'});
        }

        return res.sendStatus(200);
    }catch(err) {console.log(err)};
    
}