const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const credentials = require('../credentials');
const { response } = require('express');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());

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

module.exports = router;
