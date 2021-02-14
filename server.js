// credentials to connect to db
const credentials = require('./src/credentials');
const express = require('express');
const app = express();
const PORT = 8085;
const Sequelize = require('sequelize');
const path = require('path');
const { Client } = require('pg');
const cors = require('cors');
const connectionString = 'localhost';
const client = new Client({
  connectionString: connectionString,
});

app.use(cors());
app.set('port', process.env.PORT || 3000);

const databaseConnection = new Sequelize(
  credentials.databaseName,
  credentials.userName,
  credentials.password,
  {
    dialect: 'postgres',
    host: credentials.hostName,
    port: 5432,
    logging: false,
    dialectOptions: { requestTimeout: 30000 },
  }
);
//create endpoints
app.get('/', (req, res) => {
  res.send('SUCCESS!!');
});

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
