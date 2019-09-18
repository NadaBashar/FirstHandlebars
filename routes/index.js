var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const departments = require('./department');
const employees = require('./employee');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to the organization' });
});

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use('/departments',departments);
router.use('/employees',employees);

module.exports = router;
