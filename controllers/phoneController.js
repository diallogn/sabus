var Phone = require('../models/phone');

exports.index = function(req, res, next) {
    Phone.find()
        .exec(function(err, data){
            if (err) {next(err)}
            res.render('phone/index', {title: "Téléphone", products: data});
    });
}

exports.prd_detail = function(req, res, next) {
    Phone.findById(req.params.id)
        .exec(function(err, data){
            if(err){return next(err);}

            Phone.find({family: data.family})
                .exec(function(err, prd){
                    if(err) {return next(err);}

                    res.render('phone/detail', {title: 'Téléphone', product: data, thumbs: prd})
                });
        })
}

exports.prd_acheter = function(req, res, next) {
    Phone.findById(req.params.id)
        .exec(function(err, data) {
            if(err) {return next(err);}
            res.render('phone/showroom', {title: 'Showroom', product: data})
        })
}

