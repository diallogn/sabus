var express = require('express');
var router = express.Router();

var phone_controller = require('../controllers/phoneController');

router.get('/', phone_controller.index)
router.get('/:id/details', phone_controller.prd_detail);
router.get('/:id/showroom', phone_controller.prd_acheter);

module.exports = router;