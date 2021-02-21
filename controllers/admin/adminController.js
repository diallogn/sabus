var Category = require('../../models/category');
var Product = require('../../models/product');

exports.index = function (req, res, next) {
    Product.find()
        .exec(function(err, data) {
            if(err) {return next(err);}
            res.render('admin/admin-index', {title: 'Admin - Products', products: data})
        })
}

exports.add_product = (req, res, next) => {
    Category.find()
        .exec((err, data, next) => {
            if(err){return next(err);}

            res.render('admin/admin-create-product', {title: 'Admin - Create', categories: data})
        })
}

