#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

var async = require('async')
var Product = require('./models/product');
var Category = require('./models/category');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/sabu';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = []
var categories = []

function categoryCreate(name, cb) {
    
    var category = new Category({ name: name });
    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category)
        cb(null, category);
    }   );
}

function productCreate(name, price, ean_13, status, tags, features, categories, description, image_file, cb) {
  productdetail = { 
    name: name,
    price: price,
    ean_13: ean_13,
    status: status,
    tags: tags,
    features: features,
    categories: categories,
    description: description,
    image_file: image_file
  }
  if (categories != false) productdetail.categories = categories
    
  var product = new Product(productdetail);    
  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Product: ' + product);
    products.push(product)
    cb(null, product)
  }  );
}

function createCategory(cb) {
    async.series([
        function(callback) {
          categoryCreate("electromenager", callback);
        },
        function(callback) {
          categoryCreate("telephone", callback);
        },
        ],
        // optional callback
        cb);
}


function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate('Samsung Galaxy J2','1100000.00', '806088223223', true ,'android, phone, samsung', [{color: 'black'}], [categories[1]],'','/images/products/sm-123.jpg', callback);
        }
        ],
        // optional callback
        cb);
}

async.series([
    createCategory,
    createProducts,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Produtis: '+products);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



