var { body, validationResult} = require('express-validator');

var Category = require('../../models/category');
var Product = require('../../models/product');
var User = require('../../models/userAdmin');


exports.users = (req, res, next) => {
    if(req.user) {
        User.find()
        .exec((err, data) => {
            if(err) {return next(err);}

            res.render('admin/admin-user', {title: 'Users', users: data})
        });
    }else {
        res.redirect('/users/login')
    }
}

exports.logout = (req, res, next) => {
    req.logout()
    res.redirect('/users/login')
}
