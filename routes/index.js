var express = require('express');
var router = express.Router();

var controller = require('../controllers/plateform/controller');

router.get('/', controller.index);
router.get('/command', controller.command);
router.get('/products/:id/details', controller.prd_detail);
router.get('/products/:id/showroom', controller.showroom_get);
router.post('/products/:id/showroom', controller.showroom_post);

module.exports = router;
