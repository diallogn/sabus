var express = require('express');
var router = express.Router();

var electromenager_controller = require('../controllers/electromenagerController');

router.get('/', electromenager_controller.index);
router.get('/:id/details', electromenager_controller.prd_detail);
router.get('/:id/showroom', electromenager_controller.prd_acheter);

module.exports = router;