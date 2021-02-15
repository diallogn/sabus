var mongoose = require('mongoose');
var async = require('async');
var Electro = require('./models/electro');

// Database connect
var mongoDB = 'mongodb+srv://celafinde:69305565@cluster0.wmifd.mongodb.net/sabus?retryWrites=true&w=majority';
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
            createProduct('Neo Inverter','WF10-M15','Front Loading', '','https://adrhtpdlkq.cloudimg.io/v7/sample.li/paris.jpg?height=400&', callback)
        },
        function(callback){
            createProduct('Machine à laver WL13-C40','WL13-C40',' Semi Automatique', '','https://adrhtpdlkq.cloudimg.io/v7/sample.li/paris.jpg?height=400&', callback)
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
