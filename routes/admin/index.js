var express = require('express');
var router = express.Router();

var admin_controller = require('../../controllers/admin/adminController');

router.get('/', admin_controller.index);
router.get('/ajouter-un-produit', admin_controller.add_product)

module.exports = router;