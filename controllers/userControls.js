const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postRegisterUser = async(req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(!(name && email && password)){
        return res.status(401).json({
            message: 'All input fields are required'
        })
    };

    try{
        const oldUser = await User.findOne({ where: { email: email } });

        if(oldUser){
            return res.status(409).json({
                message: 'Email already exists. Please login or use another email to register'
            });
        };

        //encrypt password using bcrypt
        const hashPassword = await bcrypt.hash(password, 10) //salt 10

        const user = await User.create({
            name: name,
            email: email.toLowerCase(),
            password: hashPassword,
        });
        console.log('user created');

        res.status(201).json({
            message: 'User registered successfully',
            data: user
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
};

exports.postLoginUser = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!(email && password)){
        return res.status(401).json({
            message: 'All input fields are required'
        });
    };

    try{
        const user = await User.findOne({ where: {email : email}});
        if(user){
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(isPasswordMatch){
                console.log('user logged in');
                res.status(201).json({
                    message: 'Login successful',
                    token: generateAccessToken(user.id, user.email),
                })
            }else{
                return res.status(401).json({
                    message: 'Invalid login credentials'
                })
            };

        }else{
            return res.status(401).json({
                message:
                  'No account found with the provided email address. Please signup first.',
              });
        }
    }catch(error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    };
};

function generateAccessToken (id, email) {
    return jwt.sign({id, email}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
    })
};

exports.generateAccessToken = generateAccessToken

