
async function addExpense(event){
    event.preventDefault();
    try{
        const amount = event.target.amount.value;
        const description = event.target.description.value;
        const category = event.target.category.value;

        const expenseObj = {
            amount,
            description,
            category
        };

        let postExpenses = await axios.post("http://localhost:4000/add-expense",expenseObj);
        if(postExpenses.status === 201){
            shownewusers(postExpenses.data);
        }  
    }catch{
        console.log("post error")
    }

    amount.value = "";
    description.value = "";
    category.value = "";

};

window.addEventListener('DOMContentLoaded', async() => {
    try{
        let getData = await axios.get("http://localhost:4000/get-expense")
        if(getData.status === 200){ 
            console.log(getData)

            for(var i = 0; i < getData.data.length; i++){
                shownewusers(getData.data[i]);
            }
        }
    }catch{
        console.log('get error');
    }     
});

function shownewusers(expense){

    const parentNode = document.getElementById('lists');
    const childHTML = `<li id = ${expense.id}> ${expense.amount} - ${expense.category} - ${expense.description}
                <button onclick = deleteExpenses('${expense.id}')>Delete</button>
                <button onclick = editExpensesDetails('${expense.category}','${expense.amount}','${expense.description}','${expense.id}')>Edit</button>
                </li>`
    parentNode.innerHTML = parentNode.innerHTML+childHTML;
};

function editExpensesDetails(category,amount,description,expenseId){
    document.getElementById('category').value = category;
    document.getElementById('amount').value = amount;
    document.getElementById('description').value = description;

    deleteExpenses(expenseId);
};

async function deleteExpenses(expenseId){
    try{
        let response = await axios.delete(`http://localhost:4000/delete-expense/${expenseId}`);
        if (response.status === 200) {
            removeExpensesFromScreen(expenseId);
        } else {
             console.log("Delete request was not successful. Status: ", response.status);
        }
    }catch{
         console.log("delete error")
    }
};

function removeExpensesFromScreen(expenseId){
    const parentNode = document.getElementById('lists');
    const childNodeToBeDeleted = document.getElementById(expenseId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
} 
