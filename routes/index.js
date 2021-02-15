var express = require('express');
var router = express.Router();

var products_controller = require('../controllers/productsController');

/* GET home page. */
router.get('/', products_controller.index);

module.exports = router;
