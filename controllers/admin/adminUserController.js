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

exports.user_info = (req, res, next) => {
    User.findById(req.params.id, (err, found) => {
        if(err){return next(err)}
        res.render('admin/admin-user-info', {title: found.username, user: found})
    })
}

exports.user_edit_get = (req, res, next) => {
    User.findById(req.params.id, (err, found) => {
        if(err){return next(err)}
        res.render('admin/admin-user-edit', {title: 'Edit', user: found})
    })
}
