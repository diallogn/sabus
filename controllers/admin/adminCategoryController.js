var { body, validationResult} = require('express-validator');
const { findByIdAndDelete } = require('../../models/category');

var Category = require('../../models/category');
var Product = require('../../models/product');
var User = require('../../models/userAdmin');


exports.categories = (req, res, next) => {
    Category.find()
        .exec((err, data) => {
            if(err) {return next(err);}
            res.render('admin/admin-category', {title: 'Categories', categories: data})
        })
}

// Editing
exports.category_edit_get = (req, res, next) => {
    Category.findById(req.params.id)
    .exec((err, data) => {
        if(err) return next(err);
        
        res.render('admin/admin-edit-category', {title: 'Edit category', category: data})
    })
}

exports.category_edit_post = [
    body('name', 'The name field is required').trim().isLength({min: 1}).escape(),

    (req, res, next) => {

        const errors = validationResult(req);
        errors.array().forEach(error => req.flash(error.param, error.msg))

        if(!errors.isEmpty()) {
            res.render('admin/admin-edit-category', {title: "Edit", category: req.body.name, errors: req.flash()})

        }else {
            Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, function(err, d) {
                if(err) {return next(err);}  
                res.redirect('/admin/categories')
            }); 
        }
    }
    
]
// Creating
exports.category_create_get = (req, res, next) => {
    res.render('admin/admin-create-category', {title: 'Create category'})
}

exports.category_create_post = [
    
    // Validation and sanitise the name field
    body('name','The name is required').trim().isLength({min: 1}).escape(),

    // Process request after validation and sanitize
    (req, res, next) => {

        // Extract the validation errors from a request
        let errors = validationResult(req)
 
        //set errors in flash
        errors.array().forEach(error => req.flash(error.param, error.msg))
        
        // Create Category
        const category = new Category({name: req.body.name});

        if(!errors.isEmpty()){
            res.render('admin/admin-create-category', {title: 'Create category', errors: req.flash() })    
        }else{
           // Data from form are valide.
            // Check if Genre with same name already exists.
            Category.findOne({'name': req.body.name})
                .exec(function(err, found){
                    if(err){ return next(err);}

                    if(found) {
                        // Image exists, redirect to its detail page.
                        req.flash('found', req.body.name+' is already exist')
                        res.render('admin/admin-create-category', {title: 'Create category', errors: req.flash() })    
                    }else {
                        category.save(function(err){
                            if(err) { return next(err); }
                            
                            //Image saved. Redirect to genre detail page.
                            res.redirect('/admin/categories');
                        })
                    }
                })
        }
    }
]

exports.category_delete_get = (req, res, next) => {
    Category.findById(req.params.id).exec((err, d) => {
        if(err) { return next(err);}
        res.render('admin/admin-delete-category', {title: 'Delete', category: d});
    })
}

exports.category_delete_post =  [
    body('name', 'The name field is required').trim().isLength({min: 1}).escape(),

    (req, res, next) => {

        const errors = validationResult(req);
        errors.array().forEach(error => req.flash(error.param, error.msg))

        if(!errors.isEmpty()) {
            Category.findById(req.params.id).exec((err, d) => {
                if(err) { return next(err);}
                res.render('admin/admin-delete-category', {title: "delete", category: d, errors: req.flash()})
            })

        }else {
            Category.findById(req.params.id).exec((err, found) => {
                if(err){ return next(err);}
                
                if(found.name !== req.body.name) {
                    req.flash('error', 'Le nom que vous avez entrez ne correspond pas.') 
                    res.render('admin/admin-delete-category', {title: "delete", category: found, errors: req.flash()})
                }else{
                    
                    Product.find({'category': req.params.id}).exec(function(err, prd){
                        if(err) {return next(err);}

                        if(prd.length != 0) {  
                            req.flash('error', 'On ne peut pas suprimer ce category parcequ\'elle est utilisé par des produits') 
                            res.render('admin/admin-delete-category', {title: "delete", category: found, errors: req.flash()})
                        }else {
                            Category.findByIdAndDelete(req.params.id, function(err, d) {
                                if(err){ return next(err);}
                                
                                res.redirect('/admin/categories');
                            })
                        }
                    })
                }
            })
        }
    }
    
]