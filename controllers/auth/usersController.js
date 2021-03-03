var {body, validationResult} = require('express-validator')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Models
var User = require('../../models/userAdmin');

exports.user_register_get =  function(req, res, next) {
    res.render('auth/register', {title: 'Register'})
}

exports.user_register_post =  [
  body('username', "Please enter a valid username").not().isEmpty(),
  body('email', "Please enter a valid email").isEmail(),
  body('password', "Please enter a valid password").isLength({min: 6}),

  (req, res, next) => {

    var errors = validationResult(req);

    errors.array().forEach(error => req.flash(error.param, error.msg))    

    let data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }

    if(!errors.isEmpty()) {
      // They are errors
      console.log(errors)
      res.render('auth/register', {title: 'Register',register: data, errors: req.flash()})
    }else {
      // Success
      if(data.password !== req.body.password_confirm) {
        
        req.flash('match', 'You can\'t enter the same password')
        res.render('auth/register', {title: 'Register',register: data, errors: req.flash()})
      }

      User.findOne({email: req.body.email})
        .exec((err, found) => {
          if(err){return next(err);}

          if(found) {
            req.flash('found', 'This email is already exists.')
            res.render('auth/register', {title: 'Register',register: data, errors: req.flash()})
          }else {
            let newUser = new User(data);
            
            User.createUser(newUser, (err, user) => {
              if(err){ return next(err);}
            });
            res.redirect('/auth/login');
          }
        })
    }
  }
]

exports.user_login_get = (req, res, next) => {
    res.render('auth/login', {title: 'Login'});
}

exports.user_login_post =  (req, res, next) => {
    res.redirect('/admin')
}