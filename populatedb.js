var mongoose = require('mongoose');
var async = require('async');
var Electro = require('./models/electro');
var Phone = require('./models/phone');

// Database connect
var mongoUri = 'mongodb+srv://celafinde:69305565@cluster0.wmifd.mongodb.net/sabus?retryWrites=true&w=majority';
var mongoDB = 'mongodb://localhost/sabus';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true});
mongoose.Promise =global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));


var products = [];

function createProduct(name, reference, family, description, image_url, cb) {
    let productdetail = {
        name: name,
        reference: reference,
        family: family,
        description: description,
        image_url: image_url
    }
    let product = new Phone(productdetail);
    product.save(function(err, result) {
        if(err){
            cb(err, null)
            return
        }
        console.log('New Image: '+ result);
        products.push(product)
        cb(null, result);
    })
}

function prdCreate(cb) {
    async.series([
        function(callback){
            createProduct('Samsung SM-J200h/DS','SM-J200h/DS','android', '','/images/products/phone/allure.jpg', callback)
        },
        function(callback){
            createProduct('Techno Mobile WL13-C40','WL13-C40','android', '','/images/products/phone/allure.jpg', callback)
        },
        function(callback){
            createProduct('Iphone X',' FG30-S18','ios', '','/images/products/phone/allure.jpg', callback)
        },
        function(callback){
            createProduct('Huawei P200HD','P200HD','android', "",'/images/products/phone/allure.jpg', callback)
        },
        function(callback){
            createProduct('Radiateur CBH-U3813','CBH-U3813','ios', '','/images/products/phone/allure.jpg', callback)
        },
    ], 
    cb
    );
}

async.series([
    prdCreate
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Successful ');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
