
const token = localStorage.getItem('token');

function addExpense(event){
    event.preventDefault();
    const form = new FormData(event.target);
    
        const amount = form.get("amount");
        const description = form.get("description");
        const category = form.get("category");

        const expenseObj = {
            amount,
            description,
            category
        };

        axios.post("http://localhost:4000/expense/add-expense",expenseObj,
        {
            headers: { Authorization: token }
        }).then(response => {
            if(response.status === 201){
                    shownewExpenses(response.data.expense);
            }else{
                throw new Error("Something went wrong. Couldn't create new expense")
            }
        }).cath(err => console.log('error'));
        
    

    //amount = "";
    //description = "";
    //category.value = "";

};

window.addEventListener('DOMContentLoaded', () => {
    
        axios.get("http://localhost:4000/expense/get-expense",{
            headers: { Authorization: token}
        }).then((response )=>{
            if(response.status === 200){
                response.data.expenses.forEach(expense => {
                    shownewExpenses(expense);
                });
            }else{
                throw new Error("couldn't get the expense");
            }
        })
        
});

function shownewExpenses(expense){

    const tbody = document.getElementById('lists');
    const newRow = `
        <tr id="${expense.id}">
            <td>${expense.amount}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>
                <button onclick="deleteExpenses('${expense.id}')">Delete</button>
                <button onclick="editExpensesDetails('${expense.category}','${expense.amount}','${expense.description}','${expense.id}')">Edit</button>
            </td>
        </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', newRow);
};

function editExpensesDetails(category,amount,description,expenseId){
    document.getElementById('category').value = category;
    document.getElementById('amount').value = amount;
    document.getElementById('description').value = description;

    deleteExpenses(expenseId);
};

 function deleteExpenses(expenseId){
    
        axios.delete(`http://localhost:4000/expense/delete-expense/${expenseId}`,
        {
            headers: { Authorization: token}
        }).then((response) => {
            if (response.status === 204) {
                removeExpensesFromScreen(expenseId);
            } else {
                 console.log("Delete request was not successful. Status: ", response.status);
            }
        }).catch((err) => {
            console.log("delete error");
        })

};

function removeExpensesFromScreen(expenseId){
    const parentNode = document.getElementById('lists');
    const childNodeToBeDeleted = document.getElementById(expenseId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
} 

