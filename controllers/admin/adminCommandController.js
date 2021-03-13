/*---------------------------------------------------- */
/*                  Dependencies                       */
/*---------------------------------------------------- */
var fs = require('fs')
var path = require('path');
var async = require('async');
var multer = require('multer');
var { body, validationResult} = require('express-validator');

/*---------------------------------------------------- */
/*                  Data Models                        */
/*---------------------------------------------------- */

var Image = require('../../models/image');
var Category = require('../../models/category');
var Product = require('../../models/product');
var User = require('../../models/userAdmin');
var Command = require('../../models/command');

exports.command_list = (req, res, next) => {

    if(req.user) {
        Command.find({}).populate({path: 'product', populate: {path: 'image_file'}}).exec((err, results)=> {
            if(err){return next(err);}
            res.render('admin/admin-command', {title:"Liste de commandes", commands: results.reverse()})
        })
    }else{
        res.redirect('/users/login')
    }
}
