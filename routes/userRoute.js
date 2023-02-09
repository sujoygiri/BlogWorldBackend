const express = require('express');

const userController = require('../controller/userController');
const verifySession = require('../utils/sessionVerify')

const router = express.Router();

router.post('/register', userController.registrationHandler);

router.post('/login', userController.loginHandler);

router.get('/verify', verifySession, (req, res, next) => {
    let userId = res.locals.userId
    if (userId) {
        res.json({success: true})
    } else {
        res.json({success: false})
    }
});

module.exports = router;