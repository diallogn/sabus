var express = require('express');
var router = express.Router();
var auth = require('../auth');

// Controller
var users_controller = require('../controllers/auth/usersController');

// Register
router.get('/register', users_controller.user_register_get);
router.post('/register', users_controller.user_register_post);

// Login
router.get('/login', users_controller.user_login_get)



router.post('/login', auth, users_controller.user_login_post);


module.exports = router;
