var {body, validationResult} = require('express-validator')
var path = require('path')
var fs = require('fs')
var multer = require('multer')

var Cloud = require('../../models/cloud');

// Enregistrer dans le server
var diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/forsite/')
    },  
    filename: function (req, file, cb) {
      cb(null, "SABUS_" + Date.now() + path.extname(file.originalname))
    }
});
  
var fileFilter = function(req, file, cb) {
    // Les types de fichiers compatibles
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  
      // Accepte ce fichier
      cb(null, true);
    }else {
  
      // Ignore ce fichier
      cb(null, false)
    }
}
var upload = multer({storage: diskStorage, fileFilter: fileFilter});

/*---------------------------------------------------- */
/*                  List Image                         */
/*---------------------------------------------------- */
exports.index = (req, res, next) => {
    if(req.user){
        Cloud.find()
        .exec((err, files) => {
            if(err){return next(err);}
            res.render('admin/admin-images', {title: 'Images', images: files})
        })
    }else{
        res.redirect('/users/login')
    }
}

/*---------------------------------------------------- */
/*                  Create Image                         */
/*---------------------------------------------------- */
exports.image_create_get = (req, res, next) => {
    if(req.user){
        res.render('admin/admin-create-image', {title: 'Ajouter une image'})

    }else {
        res.redirect('/users/login')
    }
}

exports.image_create_post = [
    upload.single('img_file'),
    body('name', 'Le nom est obligatoire').trim().escape(),

    (req, res, next) => {
        let errors = validationResult(req);
        errors.array().forEach(e => req.flash(e.param, e.msg))

        let data = {
            name: req.body.name,
            img_file: req.body.img_file
        }
        
        const obj = {
            name:  data.name,
            length: req.file.length,        
            img:{
                data: fs.readFileSync(path.join(__dirname + '/../../public/images/forsite/' + req.file.filename)),
                contentType: req.file.contentType
            }
        }

        if(!errors.isEmpty()) {
            // they are error
            res.render('admin/admin-create-image', {title: 'Ajouter une image', data: data, errors: req.flash()})
        }else {
            // Success

            if(req.file) {
                // Fetch image data
                Cloud.findOne({'name': data.name}, (err, found) => {
                    if(err){return next(err);}

                    if(found) {
                        req.flash('info', 'Le nom que vous avez choisi est déjà utilisé')
                        res.render('admin/admin-create-image', {title: "Ajouter une image", data: data, errors: req.flash()})
                    }else {
                        let cloud = new Cloud(obj)
                        cloud.save((err, item)=> {
                            if(err){return next(err);}
                            console.log(item)
                        });
                    }
                    res.redirect('/admin/images')
                })
            }else {
                req.flash('info', "Nous n'avons pas trouvé l'image")
                res.render('admin/admin-create-image', {title: "Ajouter une image", data: data, errors: req.flash()})
            }
        }
    }
]

/*---------------------------------------------------- */
/*                  Edit Image                         */
/*---------------------------------------------------- */
exports.image_edit_get = (req, res, next) => {
    Cloud.findById(req.params.id)
    .exec((err, data) => {
        if(err){return next(err);}
        res.render('admin/admin-edit-image', {title: 'Edit', image:data})
    })
}

exports.image_edit_post = [
    upload.single('image_file'),
    // Validate and Sanitize
    body('name', 'Le nom est obligatoire').trim().isLength({min: 1}).escape(),

    (req, res, next) => { 

        let errors = validationResult(req);

        const obj = {
            name:  req.body.name,  
        }

        if(req.file) {
            obj.length = req.file.length,        
            obj.img = {
                data: fs.readFileSync(path.join(__dirname + '/../../public/images/forsite/' + req.file.filename)),
                contentType: req.file.contentType
            }
        }

        if(!errors.isEmpty()) {
            // They are errors
            Cloud.findById(req.params.id)
                .exec(function(err, data) {
                    if(err) next(err);               
                    res.render('admin/admin-edit-image', {title: 'Edit', image: data, errors: errors.array()})
                })

        }else {
            Cloud.findByIdAndUpdate(req.params.id, obj, function(err, d) {
                if(err) {return next(err);}  
                res.redirect('/admin/images')
            }); 
        }
    }
]

/*---------------------------------------------------- */
/*                  Delete Image                       */
/*---------------------------------------------------- */

exports.image_delete_get = (req, res, next) => {
    Cloud.findById(req.params.id)
    .exec((err, data) => {
        if(err){return next(err);}
        res.render('admin/admin-delete-image', {title: 'Delete', image:data})
    })
}

exports.image_delete_post = [
    body('name', "S'il vous plait veillez entrer le nom demandé.").trim().escape(),
    
    (req, res, next) => {
        let errors = validationResult(req);
        errors.array().forEach(error => req.flash(error.param, error.msg))

        let data = {
            name: req.body.name
        }
        if(!errors.isEmpty()) {
            // They are errors
            Cloud.findById(req.params.id)
            .exec((err, prd) => {
                if(err){return next(err);}
                res.render('admin/admin-delete-image', {title: 'Delete', image: prd, errors: req.flash()})
            })
        }else {
            // Success
            Cloud.findById(req.params.id).exec((err, found) => {
                if(err){ return next(err);}
                
                if(found.name !== data.name) {
                    req.flash('info', 'Le nom ne correspond pas.') 
                    res.render('admin/admin-delete-image', {title: "delete", image: found, errors: req.flash()})
                }else{
                    Cloud.findByIdAndDelete(req.params.id, function(err, d) {
                        if(err){ return next(err);}
                        
                        res.redirect('/admin/images');
                    })
                }

            })
        }
    }
]