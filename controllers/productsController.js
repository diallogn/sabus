var Electro = require('../models/electro');

exports.index = function(req, res, next) {
    Electro.find({})
        .exec(function(err, data){
            if (err) {next(err)}
            res.render('index', {title: "Sabus", products: data});
    });
}

exports.prd_detail = function(req, res, next) {
    Electro.findById(req.params.id)
        .exec(function(err, data){
            if(err){return next(err);}

            Electro.find({family: data.family})
                .exec(function(err, prd){
                    if(err) {return next(err);}

                    res.render('detail', {title: 'Electromenager', product: data, thumbs: prd})
                });
        })
}

exports.prd_acheter = function(req, res, next) {
    Electro.findById(req.params.id)
        .exec(function(err, data) {
            if(err) {return next(err);}
            res.render('showroom', {title: 'Showroom', product: data})
        })
}
