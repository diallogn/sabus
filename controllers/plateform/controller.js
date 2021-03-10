const Category = require('../../models/category');
var Product = require('../../models/product');
var Cloud = require('../../models/cloud');
var async = require('async');


exports.index = function(req, res, next) {
    async.parallel({
        logo: function(callback) {
            Cloud.findOne({name: 'logo'}).exec(callback)
        },
        slide1: function(callback) {
            Cloud.findOne({name: 'slide-1'}).exec(callback)
        },
        slide2: function(callback) {
            Cloud.findOne({name: 'slide-2'}).exec(callback)
        },
        slide3: function(callback) {
            Cloud.findOne({name: 'slide-3'}).exec(callback)
        },
        about: function(callback) {
            Cloud.findOne({name: 'about'}).exec(callback)
        },
        categories: function(callback) {
            Category.find(callback)
        },
        products: function(callback) {
            Product.find({status: true}).populate('image_file').limit(5).exec(callback)
        }
    },
    
    function(err, results) {
        if(err){ return next(err);}
        res.render('plateform/index', {title: "Catalogue", products: results.products, logo: results.logo, slide1: results.slide1, slide2: results.slide2, slide3: results.slide3, about: results.about, categories: results.categories});
    })
}

exports.prd_detail = function(req, res, next) {
    Product.findById(req.params.id)
        .populate('image_file')
        .populate('category')
        .exec(function(err, data){
            if (err) {next(err)}
            
            Product.find({status: true, category: data.category.id}) 
            .populate('image_file')
            .populate('category')  
            .exec((err, f) => {
                if(err) { return next(err);}

                res.render('plateform/detail', {title: 'Sabus', product: data, thumbs: f})
            })
    });
}

exports.showroom = function(req, res, next) {
    Product.findById(req.params.id)
    .populate('category')  
        .exec(function(err, data) {
            if(err) {return next(err);}
            console.log(data)
            res.render('plateform/showroom', {title: 'Showroom', product: data})
        })
}

