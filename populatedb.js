var mongoose = require('mongoose');
var async = require('async');
var Electro = require('./models/electro');

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
    let product = new Electro(productdetail);
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
            createProduct('Neo Inverter','WF10-M15','Front Loading', '','/images/products/no-prd.png', callback)
        },
        function(callback){
            createProduct('Congélateur Horizontal WL13-C40','WL13-C40','congelateur horizontal', '','/images/products/congelateur-horizontal.png', callback)
        },
        function(callback){
            createProduct('Démodulateur P200HD','P200HD','Démodulateurs', "Petit facile a installer, le P200HD nous permet d'avoir un conetnu en Full HD , avec une mémoire de chaines qui peut aller jusqu'à 5000 Chaines.","/images/products/demodulateur.jpg", callback)
        }
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
