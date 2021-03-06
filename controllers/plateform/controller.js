var Product = require('../../models/product');

exports.index = function(req, res, next) {
    Product.find({status: true})
        .populate('image_file')
        .exec(function(err, data){
            if (err) {next(err)}
            res.render('plateform/index', {title: "Catalogue", products: data});
    });
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

                res.render('plateform/detail', {title: 'Products', product: data, thumbs: f})
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

