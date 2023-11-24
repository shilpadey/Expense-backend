
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');

const expenseDetails = document.getElementById('mytracker');
expenseDetails.addEventListener('submit', addExpense);
window.addEventListener('DOMContentLoaded', getExpenses);

async function addExpense(event){

        try{

            const expenseObj = {
                amount,
                description,
                category
            };

            let postExpenses = await axios.post("http://localhost:3000/add-expense",expenseObj);
             if(postExpenses.status === 201){
                window.location.href = './asyncexpense.html'
                 shownewusers(postExpenses.data);
             }  
        }catch{
              console.log("post error")
        }

        amount.value = "";
        description.value = "";
        category.value = "";
    
};

async function getExpenses() {
    try{
     let getData = await axios.get("http://localhost:3000/get-expense")
        if(getData.status === 200){ 
            console.log(getData)

            for(var i = 0; i < getData.data.length; i++){
                shownewusers(getData.data[i]);
            }
        }
    }catch{
        console.log('get error');
    }     
};

function shownewusers(user){

    const parentNode = document.getElementById('lists');
    const childHTML = `<li id = ${user.id}> ${user.amount} - ${user.category} - ${user.description}
                       <button onclick = deleteExpenses('${user.id}')>Delete</button>
                       <button onclick = editExpensesDetails('${user.category}','${user.amount}','${user.description}','${user.id}')>Edit</button>
                       </li>`
    parentNode.innerHTML = parentNode.innerHTML+childHTML;
};


function editExpensesDetails(category,amount,desc,userId){
    document.getElementById('category').value = category;
    document.getElementById('amount').value = amount;
    document.getElementById('desc').value = desc;

    deleteExpenses(userId);
};

async function deleteExpenses(userId){
    try{
        let deleteExpenses = await axios.delete(`https://crudcrud.com/api/3de55dd2fe4747c684b0829999c75b05/expensesData/${userId}`)
         if(deleteExpenses.status === 200){
            removeExpensesFromScreen(userId);
         }
    }catch{
         console.log("delete error")
    }
};

function removeExpensesFromScreen(userId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
} 