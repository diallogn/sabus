var express = require('express')
var router = express.Router()

var catalog_controller = require('../controllers/plateform/catalogController');

router.get('/', catalog_controller.index)
router.get('/produits-par-categorie/:id', catalog_controller.list_by_category)

module.exports = router;