const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./src/models/User'); // Schema for the user
const path = require('path');  // Add this line to import the path module
const bcrypt = require('bcrypt');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const port = 3000;

// Middleware  
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('assets'));
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views'));  





app.use(authRoutes);
// Routes


mongoose
    .connect('mongodb://localhost:27017/unity_hospital')
    .then(() => {
        app.listen(port);
        console.log('connected to db');
    }).catch((err) => {
        console.log(err);
    });
