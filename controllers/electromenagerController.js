var Electro = require('../models/electro');

exports.index = function(req, res, next) {
    Electro.find()
        .exec(function(err, data){
            if (err) {next(err)}
            res.render('electro/index', {title: "Electroménager", products: data});
    });
}

exports.prd_detail = function(req, res, next) {
    Electro.findById(req.params.id)
        .exec(function(err, data){
            if(err){return next(err);}

            Electro.find({family: data.family})
                .exec(function(err, prd){
                    if(err) {return next(err);}

                    res.render('electro/detail', {title: 'Electroménager', product: data, thumbs: prd})
                });
        })
}

exports.prd_acheter = function(req, res, next) {
    Electro.findById(req.params.id)
        .exec(function(err, data) {
            if(err) {return next(err);}
            res.render('electro/showroom', {title: 'Showroom', product: data})
        })
}
