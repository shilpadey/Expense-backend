require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const expenseRoutes = require('./routes/expenseRoutes');
const rootDir = require('./util/path');
const sequelize = require('./util/database');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());

app.use(bodyparser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());


app.use("/",expenseRoutes);
app.use('/user', userRoutes);

app.get('/',(req,res,next) => {
    res.sendFile(path.join(rootDir, `views/${req.url}`));
})

const PORT = process.env.PORT || 4000;

sequelize
.sync()
.then(result => {
    app.listen(PORT, console.log(`Server is running on port: ${PORT}`));
})
.catch(err => {
    console.log(err);
});