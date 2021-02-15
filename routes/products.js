var express = require('express');
var router = express.Router();

var products_controller = require('../controllers/productsController');

router.get('/', products_controller.index);
router.get('/:id', products_controller.prd_detail);
router.get('/:id/acheter', products_controller.prd_acheter);

module.exports = router;