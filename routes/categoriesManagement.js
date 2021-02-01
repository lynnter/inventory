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

//testing connection
router.get('/testconnection', (req, res) => {
  res.send('Category Management test');
});

//define model
let Category = databaseConnection.define(
  'Category',
  {
    categoryId: {
      // automatically set primary key
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: Sequelize.STRING(50),
      allowNull: true,
      isDeleted: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
    freezeTableName: true, //so sequelize doesn't pluralize the table name);
  }
);

// create new category
router.post('/create_new_category', (req, res) => {
  //set headers
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  console.log(req.body);
  Category.create(req.body).then((category) => {
    res.json(category);
  });
});

// //fetch all
router.get('/fetch_all_categories', (req, res) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  try {
    Category.findAll().then((categories) => {
      res.json(categories);
    });
  } catch (ex) {
    res.json(ex);
  }
});

//fetch specific category by id
router.get('/fetch_category_by_id/:categoryId', async (req, res) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  try {
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    const categoryResult = await Category.findOne({
      where: { categoryId: categoryId },
    }).then((category) => {
      res.json(category);
    });
  } catch (ex) {
    res.json(ex);
  }
});

//update
router.put('/update_target_category', (req, res) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  try {
    const categoryId = req.body.categoryId;
    Category.update(
      {
        //fields of model to update
        categoryName: req.body.categoryName,
        isDeleted: req.body.isDeleted,
      },
      {
        //where clause
        where: {
          categoryId: categoryId,
        },
      }
    ).then((count) => {
      res.json('Rows updated: ' + count);
    });
  } catch (ex) {
    res.json(ex);
  }
});

module.exports = router;
