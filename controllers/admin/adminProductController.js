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

/*---------------------------------------------------- */
/*                  Upload Image                       */
/*---------------------------------------------------- */

// Enregistrer dans le server
var diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images/uploads/')
    },  
    filename: function (req, file, cb) {
      cb(null, "SABUS_IMG_" + Date.now() + '_'+ Math.round(Math.random()* 1E9) + path.extname(file.originalname))
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
/*                  List of Product                    */
/*---------------------------------------------------- */

// Index
exports.index = (req, res, next) => {
    res.redirect('/users/login');
}
// Listing
exports.products = function (req, res, next) {
    if(req.user) {
        Product.find({})
            .populate('category')
            .populate('image_file')
            .exec(function(err, data) {
                if(err) {return next(err);}
                res.render('admin/admin-index', {title: 'Products', products: data.reverse()})
            });
        }else {
            res.redirect('/users/login')
        }
}

/*---------------------------------------------------- */
/*                  Pagination                         */
/*---------------------------------------------------- */

// Next
exports.next = function (req, res, next) {
    console.log('Limit: '+req.params)
}

// Prev
exports.prev = function(req, res, next) {

} 

/*---------------------------------------------------- */
/*                  Create Product                     */
/*---------------------------------------------------- */

// GET

exports.product_create_get = (req, res, next) => {
    Category.find()
        .exec((err, data) => {
            if(err){return next(err);}         
            res.render('admin/admin-create-product', {title: 'Create product', categories: data})
        })
}

// POST

exports.product_create_post = [
    
    // Upload File
    upload.single('prd_image_file'), 

    // Validate and Sanitize
    body('prd_name').trim().isLength({min: 1}).escape().withMessage('Le nom est obligatoire'),
    body('prd_price').trim().isLength({min: 1}).escape().withMessage('Le prix est obligatoire'),
    body('prd_ean_13').trim().isLength({min: 1}).escape().withMessage('Le code  EAN-13 est obligatoire'),
    body('prd_tags').trim().isLength({min: 1}).escape().withMessage('Le mots-cle sont obligatoire'),
    body('prd_category').trim().isLength({min: 1}).escape().withMessage('Le prix est obligatoire.'),
    body('prd_image_file').optional().trim().isLength({min: 1}).escape().withMessage('L\'image est obligatoire.'),
    
    // optional
    body('prd_description_1').optional().trim().escape(),
    body('prd_description_2').optional().trim().escape(),
    body('prd_description_3').optional().trim().escape(),
    body('prd_description_4').optional().trim().escape(),
    body('prd_description_5').optional().trim().escape(),

    body('prd_feature_field_key_1').optional().trim().escape(),
    body('prd_feature_field_key_2').optional().trim().escape(),
    body('prd_feature_field_key_3').optional().trim().escape(),
    body('prd_feature_field_key_4').optional().trim().escape(),
    body('prd_feature_field_key_5').optional().trim().escape(),

    body('prd_feature_field_value_1').optional().trim().escape(),
    body('prd_feature_field_value_2').optional().trim().escape(),
    body('prd_feature_field_value_3').optional().trim().escape(),
    body('prd_feature_field_value_4').optional().trim().escape(),
    body('prd_feature_field_value_5').optional().trim().escape(),

    (req, res, next) => { 
        
        // optional desc
        let descArray = []
        let featObj  = {}

        // Extract Errors
        let errors = validationResult(req)

        // Fetch product data
        let productDetail = {
            status: false,
            name: req.body.prd_name,
            price: req.body.prd_price,
            ean_13: req.body.prd_ean_13,
            tags: req.body.prd_tags,
            description: [],
            features: {},
        } 

        if(req.body.prd_status) {
            productDetail.status = true
        }
        if(req.body.prd_description_1) {
            productDetail.description.push(req.body.prd_description_1)
           descArray.push(req.body.prd_description_1)
        }
        if(req.body.prd_description_2) {
            productDetail.description.push(req.body.prd_description_2)
            descArray.push(req.body.prd_description_2)
        }
        if(req.body.prd_description_3) {
            productDetail.description.push(req.body.prd_description_3)
            descArray.push(req.body.prd_description_3)
        }
        if(req.body.prd_description_4) {
            productDetail.description.push(req.body.prd_description_4)
            descArray.push(req.body.prd_description_4)
        }
        if(req.body.prd_description_5) {
            productDetail.description.push(req.body.prd_description_5)
            descArray.push(req.body.prd_description_5)
        }

        if(req.body.prd_feature_field_key_1 && req.body.prd_feature_field_value_1) {
            productDetail.features[req.body.prd_feature_field_key_1 ]= req.body.prd_feature_field_value_1
            featObj[req.body.prd_feature_field_key_1 ]= req.body.prd_feature_field_value_1
        }
        if(req.body.prd_feature_field_key_2 && req.body.prd_feature_field_value_2) {
            productDetail.features[req.body.prd_feature_field_key_2 ]= req.body.prd_feature_field_value_2
            featObj[req.body.prd_feature_field_key_2 ]= req.body.prd_feature_field_value_2
        }
        if(req.body.prd_feature_field_key_3 && req.body.prd_feature_field_value_3) {
            productDetail.features[req.body.prd_feature_field_key_3 ]= req.body.prd_feature_field_value_3
            featObj[req.body.prd_feature_field_key_3 ]= req.body.prd_feature_field_value_3
        }
        if(req.body.prd_feature_field_key_4 && req.body.prd_feature_field_value_4) {
            productDetail.features[req.body.prd_feature_field_key_4 ]= req.body.prd_feature_field_value_4
            featObj[req.body.prd_feature_field_key_4 ]= req.body.prd_feature_field_value_4
        }
        if(req.body.prd_feature_field_key_5 && req.body.prd_feature_field_value_5) {
            productDetail.features[req.body.prd_feature_field_key_5 ]= req.body.prd_feature_field_value_5
            featObj[req.body.prd_feature_field_key_5 ]= req.body.prd_feature_field_value_5
        }
        
        if(!errors.isEmpty()) {
            // They are errors
            Category.find()
            .exec((err, data) => {
                if(err){return next(err);}
                res.render('admin/admin-create-product', {title: 'Create product', product: req.body, descList: descArray, featList: featObj, errors: errors.array(), categories: data})
            })
        }else {
            // Success
            if(req.file) {
                
                // Fetch image data
                const obj = {
                    name:  "SABUS_IMG_" + Date.now() + '_'+ Math.round(Math.random()* 1E9) + path.extname(req.file.originalname),
                    length: req.file.length,        
                    img:{
                        data: fs.readFileSync(path.join(__dirname + '/../../public/images/uploads/' + req.file.filename)),
                        contentType: req.file.contentType
                    }
                }
                
                // Find category of product
                Category.find({name: req.body.prd_category}).exec(function(err, result) {
                    if(err){return next(err);}
                    productDetail.category = result[0]
                    
                    //Send Image on DB
                    Image.create(obj, (err, item) => {
                        if(err){return next(err);}
                        productDetail.image_file = item
                        
                        // Save product on DB
                        let product = new Product(productDetail)
                        product.save(function(err, prd) {
                            if(err){ return next(err);}
                            
                            // Redirect to product detail
                            res.redirect(prd.detail_url);
                        })
                        fs.unlinkSync(path.join(__dirname + '../../../public/images/uploads/' + req.file.filename))
    
                    })  
                })
                
            }
            else {
                res.status(500).send({msg: "Nous n'avons pas trouvé l'image."})
            }

        }
    }

]


/*---------------------------------------------------- */
/*                  Edit Product                       */
/*---------------------------------------------------- */

// Edition
exports.product_edit_get = function (req, res, next) {
    Product.findById(req.params.id)
        .populate('category')
        .populate('image_file')
        .exec(function(err, data) {
            if(err) next(err);         
            
            res.render('admin/admin-edit-product', {title: 'Edit', product: data})
        })
}

exports.product_edit_post = [
    // Validate and Sanitize
    body('prd_name', 'Le nom est obligatoire').trim().isLength({min: 1}).escape(),
    body('prd_price').trim().isLength({min: 1}).escape().withMessage('Le prix est obligatoire'),
    body('prd_ean_13').trim().isLength({min: 1}).escape().withMessage('Le code  EAN-13 est obligatoire'),
    body('prd_tags').trim().isLength({min: 1}).escape().withMessage('Le mots-cle sont obligatoire'),

    (req, res, next) => { 

        let errors = validationResult(req);
   // Fetch product data
        let productDetail = {
            status: false,
            name: req.body.prd_name,
            price: req.body.prd_price,
            ean_13: req.body.prd_ean_13,
            tags: req.body.prd_tags,
        }
        

        if(req.body.prd_status) {
            productDetail.status = true
        }

        if(!errors.isEmpty()) {
            // They are errors

            Product.findById(req.params.id)
                .populate('category')
                .populate('image_file')
                .exec(function(err, data) {
                    if(err) next(err);               
                    res.render('admin/admin-edit-product', {title: 'Edit', product: data, errors: errors.array()})
                })

        }else {
            // Success
            console.log('SUCCESS')
        
            console.log(productDetail)
            
            Product.findByIdAndUpdate(req.params.id, productDetail, function(err, d) {
                if(err) {return next(err);}  
                res.redirect('/admin/products')
            }); 

        }
    }
]


/*---------------------------------------------------- */
/*                  Delete Product                     */
/*---------------------------------------------------- */

exports.product_delete_get = (req, res, next) => {
    Product.findById(req.params.id)
    .populate('image_file')
    .exec((err, prd) => {
        if(err){return next(err);}
        
        res.render('admin/admin-delete-product', {title: 'Delete', product: prd})
    })
}

exports.product_delete_post = [
    body('name', "S'il vous plait veillez entrer le nom demandé.").trim().isLength({min: 1}).escape(),
    
    (req, res, next) => {
        let errors = validationResult(req);
        errors.array().forEach(error => req.flash(error.param, error.msg))

        if(!errors.isEmpty()) {
            // They are errors
            Product.findById(req.params.id)
            .exec((err, prd) => {
                if(err){return next(err);}
        
                res.render('admin/admin-delete-product', {title: 'Delete', product: prd, errors: req.flash()})
            })
        }else {
            // Success
            Product.findById(req.params.id).populate('image_file').exec((err, found) => {
                if(err){ return next(err);}
                if(found.name !== req.body.name) {
                    req.flash('error', 'Le nom que vous avez entrez ne correspond pas.') 
                    res.render('admin/admin-delete-product', {title: "delete", product: found, errors: req.flash()})
                }else{
                    Product.findByIdAndDelete(req.params.id, function(err, d) {
                        if(err){ return next(err);}
                        
                        Image.findByIdAndDelete(d.image_file, (err, i) => {
                            if(err){return next(err);}

                            res.redirect('/admin/products');
                        })
                    })
                }
            })
        }
    }
]