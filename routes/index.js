var express = require('express');
var router = express.Router();
var Electro = require('../models/electro');
var Phone = require('../models/phone')

/* GET home page. */
router.get('/', function(req, res, next){
   var electro;
   var phone;

   Electro.find()
        .exec(function(err, data){
            if (err) {next(err)}
            electro = data

            Phone.find()
            .exec(function(err, data){
               if (err) {next(err)}
               phone = data
               res.render('index', { title: "Sabus", title1: 'Electroménager', title2: 'Téléphone', electros: electro, phones: phone} )
        });
    });
   

});

module.exports = router;
