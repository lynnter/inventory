const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const Sequelize = require('sequelize');
// method of sequelize to give us access to search filter
const { QueryTypes } = require('sequelize');
const credentials = require('../credentials');

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

//test connection
router.get('/testconnection', (req, res) => {
  res.send('API WORKS!');
});

module.exports = router;
