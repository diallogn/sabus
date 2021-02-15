var Electro = require('../models/electro');

exports.index = function(req, res, next) {
    Electro.find({})
        .exec(function(err, data){
            if (err) {next(err)}
            res.render('index', {title: "Sabus", products: data});
    });
}
