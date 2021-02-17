// credentials to connect to db
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 8085;
const Sequelize = require('sequelize');
const path = require('path');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const connectionString = 'localhost';

app.set('port', process.env.PORT || 3000);

// middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(cookieParser('secretcode'));

app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);

//create routes
app.post('/login', (req, res) => {
  console.log('loggin in here: ', req.body);
});
app.post('/register', (req, res) => {
  console.log('registerin in here: ', req.body);
});
app.get('/user', (req, res) => {});

//initialize routes
const categoriesManagement = require('./routes/categoriesManagement');
const itemsManagement = require('./routes/itemsManagement');
const usersManagement = require('./routes/usersManagement');

app.use('/login', (req, res) => {
  res.send({
    token: 'test123',
  });
});

app.use('/api/categoriesmanagement', categoriesManagement);
app.use('/api/itemsmanagement', itemsManagement);
app.use('/api/usersmanagement', usersManagement);

app.listen(PORT);
console.log('server is running on http://127.0.0.1:' + PORT);
