var express = require('express');
var router = express.Router();

var admin_product_controller = require('../controllers/admin/adminProductController');
var admin_category_controller = require('../controllers/admin/adminCategoryController');
var admin_user_controller = require('../controllers/admin/adminUserController');
var admin_image_controller = require('../controllers/admin/adminImagesController');
var admin_command_controller = require('../controllers/admin/adminCommandController');

// Product Controller
router.get('/', admin_product_controller.index);
router.get('/products', admin_product_controller.products)

router.get('/products/create', admin_product_controller.product_create_get)
router.post('/products/create', admin_product_controller.product_create_post)

router.get('products/page/next' ,admin_product_controller.next)
router.get('products/page/prev' ,admin_product_controller.prev)

router.get('/product/:id/edit', admin_product_controller.product_edit_get)
router.post('/product/:id/edit', admin_product_controller.product_edit_post)

router.get('/product/:id/delete', admin_product_controller.product_delete_get)
router.post('/product/:id/delete', admin_product_controller.product_delete_post)

//Category Controller
router.get('/categories', admin_category_controller.categories)
router.get('/category/create', admin_category_controller.category_create_get)
router.post('/category/create', admin_category_controller.category_create_post)
router.get('/category/:id/edit', admin_category_controller.category_edit_get)
router.post('/category/:id/edit', admin_category_controller.category_edit_post)
router.get('/category/:id/delete', admin_category_controller.category_delete_get)
router.post('/category/:id/delete', admin_category_controller.category_delete_post)

// User Controller
router.get('/users', admin_user_controller.users)
router.get('/logout', admin_user_controller.logout)

//Administrator
router.get('/:id/me', admin_user_controller.user_info)
router.get('/user/:id/edit', admin_user_controller.user_edit_get)

// images
router.get('/images', admin_image_controller.index);
router.get('/image/create', admin_image_controller.image_create_get);
router.post('/image/create', admin_image_controller.image_create_post);

router.get('/image/:id/edit', admin_image_controller.image_edit_get)
router.post('/image/:id/edit', admin_image_controller.image_edit_post)

router.get('/image/:id/delete', admin_image_controller.image_delete_get)
router.post('/image/:id/delete', admin_image_controller.image_delete_post)

// Commandes
router.get('/commands', admin_command_controller.command_list)
module.exports = router;