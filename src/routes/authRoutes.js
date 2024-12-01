// routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt');
const { body } = require('express-validator');
const router = express.Router();
const usercontroller = require('../controller/control')


router.get('/', usercontroller.mainpage);


router.get('/register', usercontroller.getregister);
router.post('/register', [body('confirmPassword')
    .custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),], usercontroller.addUser);


router.get('/login',usercontroller.getlogin);
router.post('/login',usercontroller.postlogin);

router.get('/about',usercontroller.getabout);
router.get('/blog',usercontroller.getblogs);
router.get('/doctors',usercontroller.getdoctors);
//router.get('/gallery',usercontroller.gallery);
router.get('/appointment',usercontroller.getappointment);

router.post('/appointment',usercontroller.postAppointment);
module.exports = router;
