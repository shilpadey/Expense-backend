const express = require('express');
const router = express.Router();

const userControls = require('../controllers/userControls');

router.post('/signup', userControls.postRegisterUser);

router.post('/login', userControls.postLoginUser);


module.exports = router;