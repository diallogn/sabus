const Category = require('../../models/category');
var Product = require('../../models/product');
var Cloud = require('../../models/cloud');
var async = require('async');


exports.index = function(req, res, next) {
    async.parallel({
        logo: function(callback) {
            Cloud.findOne({name: 'logo'}).exec(callback)
        },
        banner: function(callback) {
            Cloud.findOne({name: 'banner'}).exec(callback)
        },
        categories: function(callback) {
            Category.find(callback)
        },
        products: function(callback) {
            Product.find({status: true}).limit(10).populate('image_file').exec(callback)
        }
    },
    
    function(err, results) {
        if(err){ return next(err);}
        res.render('plateform/catalog', {title: "Catalogue", products: results.products.reverse(), logo: results.logo, banner: results.banner, categories: results.categories});
    })
}


exports.list_by_category = function(req, res, next) {
    async.parallel({
        logo: function(callback) {
            Cloud.findOne({name: 'logo'}).exec(callback)
        },
        banner: function(callback) {
            Cloud.findOne({name: 'banner'}).exec(callback)
        },
        categories: function(callback) {
            Category.find(callback)
        },
        category: function(callback) {
            Category.findById(req.params.id).exec(callback)
        },
        products: function(callback) {
            Product.find({status: true, category: req.params.id}).limit(10).populate('image_file').exec(callback)
        }
    },
    
    function(err, results) {
        if(err){ return next(err);}
        res.render('plateform/catalog-by-category', {title: results.category.name, products: results.products.reverse(), logo: results.logo, banner: results.banner, categories: results.categories});
    })
}
