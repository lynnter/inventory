// credentials to connect to db
const credentials = require('./credentials');
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const app = express();
const PORT = 8085;

const Sequelize = require('sequelize');

//initial sequelize to connect to db

const databseConnection = new Sequelize(
  credentials.databaseName,
  credentials.userName,
  credentials.password,
  {
    dialect: 'postgres',
    host: credentials.hostName,
    port: 1433, //db default port
    logging: false,
    dialectOptions: {
      requestTimeout: 30000,
    },
  }
);

app.listen(PORT);
console.log('server is running on http://127.0.0.1:' + PORT);
