const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const expenseRoutes = require('./routes/expenseRoutes');
const rootDir = require('./util/path');
const sequelize = require('./util/database');

const app = express();

app.use(cors());

//app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.use("/",expenseRoutes);

/*app.get('/',(req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'asyncexpense.html'));
})*/

sequelize
.sync()
.then(result => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});