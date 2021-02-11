const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const credentials = require('../src/credentials');
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
  res.send('Item Management test');
});

//define model
let Item = databaseConnection.define(
  'Item',
  {
    itemId: {
      // automatically set primary key
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    itemName: {
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

// create new item
router.post('/create_new_item', (req, res) => {
  //set headers
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  console.log(req.body);
  Item.create(req.body).then((item) => {
    res.json(item);
  });
});

// //fetch all
router.get('/fetch_all_items', (req, res) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  try {
    Item.findAll().then((items) => {
      res.json(items);
    });
  } catch (ex) {
    res.json(ex);
  }
});

//fetch specific item by id
router.get('/fetch_item_by_id/:itemId', async (req, res) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  try {
    const itemId = req.params.itemId;
    const itemResult = await Item.findOne({
      where: { itemId: itemId, isDeleted: false },
    });
    if (itemResult === null) {
      res.json('No item found!');
    } else {
      res.json(itemResult);
    }
  } catch (ex) {
    res.json(ex);
  }
});

//update
router.put('/update_target_item', (req, res) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  try {
    const itemId = req.body.itemId;
    Item.update(
      {
        //fields of model to update
        itemName: req.body.itemName,
        isDeleted: req.body.isDeleted,
      },
      {
        //where clause
        where: {
          itemId: itemId,
        },
      }
    ).then((count) => {
      res.json('Rows updated: ' + count);
    });
  } catch (ex) {
    res.json(ex);
  }
});

//deletion is paranoid method - modified update method
router.delete('/delete_target_item/:itemId', (req, res) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  try {
    const itemId = req.body.itemId;
    Item.update(
      {
        //fields of model to update
        itemName: req.body.itemName,
        isDeleted: req.body.isDeleted,
      },
      {
        //where clause
        where: {
          itemId: itemId,
        },
      }
    ).then((count) => {
      res.json('Rows deleted: ' + count);
    });
  } catch (ex) {
    res.json(ex);
  }
});

module.exports = router;
