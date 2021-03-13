const Category = require('../../models/category');
var Product = require('../../models/product');
var Command = require('../../models/command');
var Cloud = require('../../models/cloud');
var async = require('async');
var {body, validationResult} = require('express-validator');

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
            Product.find({status: true}).populate('image_file').exec(callback)
        }
    },
    
    function(err, results) {
        if(err){ return next(err);}
        let list = results.products.slice(results.products.length - 5)

        res.render('plateform/index', {title: "Landing Page", products: list.reverse(), logo: results.logo, slide1: results.slide1, slide2: results.slide2, slide3: results.slide3, about: results.about, categories: results.categories});
    })
}

exports.prd_detail = function(req, res, next) {

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
        product: function(callback) {
            Product.findById(req.params.id).populate('image_file').populate('category').exec(callback)
        },
        thumbs: function(callback) {
            Product.find({status: true}).populate('image_file').populate('category').exec(callback)
        }
    },
    (err, results) => {
        if(err){ return next(err);}
        let thumbs = []
        let features = []

        // Features
        for(var i in results.product.features) {
            features.push({key: i, value:results.product.features[i] })
        } 

        // Thumbs
        results.thumbs.forEach( thumb => {
            if(results.product.category.id == thumb.category.id){
                thumbs.push(thumb)
            }
        })
        res.render('plateform/detail', {title: 'Sabus', logo: results.logo,  categories: results.categories, banner: results.banner, product: results.product, features: features, thumbs: thumbs})
    })

}
exports.showroom_get = function(req, res, next) {
    async.parallel({
        logo: function(callback) {
            Cloud.findOne({name: 'logo'}).exec(callback)
        },
        banner: function(callback) {
            Cloud.findOne({name: 'banner'}).exec(callback)
        },
        about: function(callback) {
            Cloud.findOne({name: 'about'}).exec(callback)
        },
        categories: function(callback) {
            Category.find(callback)
        },
        product: function(callback) {
            Product.findById(req.params.id).populate('image_file').populate('category').exec(callback)
        }
    },
    
    function(err, results) {
        if(err){ return next(err);}
        res.render('plateform/showroom', {title: results.product.name, product: results.product, logo: results.logo, banner: results.banner, about: results.about, categories: results.categories});
    })
}

exports.showroom_post = [
    body('firstName', 'Le nom est obligatoire').trim().isLength({min: 2}).escape(),
    body('lastName', 'Le prénom est obligatoire').trim().isLength({min: 2}).escape(),
    body('phone', 'Le numéro de téléphone est obligatoire').trim().isLength({min: 2}).escape(),
    body('email').optional().trim().isEmail().escape(),
    body('address').optional().trim().escape(),

    (req, res, next) => {
        let errors = validationResult(req);

        let data = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            product: req.body.product_id,
        }

        if(!errors.isEmpty()) {
            async.parallel({
                logo: function(callback) {
                    Cloud.findOne({name: 'logo'}).exec(callback)
                },
                categories: function(callback) {
                    Category.find(callback)
                },
                product: function(callback) {
                    Product.findById(req.params.id).populate('image_file').populate('category').exec(callback)
                }
            },
            
            function(err, results) {
                if(err){ return next(err);}
                res.render('plateform/showroom', {title: results.product.name, command: data, product: results.product, logo: results.logo, categories: results.categories, errors: errors.array()});
            })
        }else{
            let command = new Command(data)
            command.save((err, d) => {
                if(err){return next(err);}

                res.redirect('/command')
            })

        }
    }
]

exports.command = (req, res, next) => {
    
    async.parallel({
        logo: function(callback) {
            Cloud.findOne({name: 'logo'}).exec(callback)
        },
        categories: function(callback) {
            Category.find(callback)
        },
    },
    
    function(err, results) {
        if(err){ return next(err);}
        res.render('plateform/command', {title: 'Command', logo: results.logo, categories: results.categories});
    })
}

