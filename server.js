// credentials to connect to db
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./src/models/user');

const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://Lynnjamin:mongoDB9000@cluster0.exme3.mongodb.net/inventoryApp?retryWrites=true&w=majority                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Mongoose is connected'))
  .catch((err) => console.log(err));

// middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
  console.log(req.body);
});

app.post('/registration', (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send('User Already Exists');
    if (!doc) {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      res.send('User Created');
    }
  });
});

//async task
app.get('/get-user', (req, res) => {
  console.log(req.body);
  const user = new User({
    email: 'test@test.com',
    password: 'testpw',
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });

  user.save();
});

//initialize routes
const categoriesManagement = require('./routes/categoriesManagement');
const itemsManagement = require('./routes/itemsManagement');
const usersManagement = require('./routes/usersManagement');

app.use('/api/categoriesmanagement', categoriesManagement);
app.use('/api/itemsmanagement', itemsManagement);
app.use('/api/usersmanagement', usersManagement);

app.listen(4000, () => {
  console.log('Server has started');
});
