var express = require('express');
var router = express.Router();

var controller = require('../controllers/plateform/controller');

router.get('/', controller.index)
router.get('/products/:id/details', controller.prd_detail);
router.get('/products/:id/showroom', controller.showroom);

module.exports = router;
