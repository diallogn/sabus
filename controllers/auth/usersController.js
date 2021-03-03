var {body, validationResult} = require('express-validator')

// Models
var User = require('../../models/userAdmin');

exports.user_register_get =  function(req, res, next) {
    res.render('auth/register', {title: 'Register'})
}

exports.user_register_post =  [
  body('username', "Please enter a valid username").trim().notEmpty().escape(),
  body('email', "Please enter a valid email").trim().isEmail().escape(),
  body('password', "Please enter a valid password").trim().isLength({min: 6}).escape(),

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
        req.flash('match', 'Les mots de pass que vous avez donné ne sont pas les mêmes')
        res.render('auth/register', {title: 'Register',register: data, errors: req.flash()})
      }

      User.getUserByUsername(data.username, (err, found) => {
        if(err){ return next(err);}

        if(found) {
          req.flash('match', 'Ce username est déja utilisé')
          res.render('auth/register', {title: 'Register',register: data, errors: req.flash()})
        }else {

          User.getUserByEmail(data.email, (err, f) => {
            if(err){ return next(err);}
            if(f) {
              req.flash('match', 'Cette address email est déja utilisé')
              res.render('auth/register', {title: 'Register',register: data, errors: req.flash()})
            }else {
              
              let newUser = new User(data);
              User.createUser(newUser, (err) => {
                if(err){ return next(err);}
                  res.redirect('/users/login')
              })
            }
          })
              
        }
      })
    }
  }
]

exports.user_login_get = (req, res, next) => {
    res.render('auth/login', {title: 'Login'});
}

exports.user_login_post = (req, res, next) => {
    console.log(req.user)
}