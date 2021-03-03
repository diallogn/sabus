var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sabus-app', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error :'));


var async = require('async')
var Product = require('./models/product');
var Category = require('./models/category');
var Image = require('./models/image');
var UserAdmin = require('./models/userAdmin');
var Client = require('./models/client');
var ClientReview = require('./models/reviewClient'); 

var products = []
var categories = []
var images = []
var userAdmins = []
var clients = []
var clientReviews = []

function imageCreate(url, cb) {
  var image = new Image({ url: url });
  image.save(function (err) {
    if(err) {cb(err, null); return;}
    console.log('New Image: ' + image);
    images.push(image);
    cb(null, image);
  });
}

function userAdminCreate(username, password, cb) {
  var userAdmin = new UserAdmin({ username: username, password: password });
  
  userAdmin.save(function (err) {
    if(err) {cb(err, null); return;}
    console.log('New UserAdmin: ' + userAdmin);
    userAdmins.push(userAdmin);
    cb(null, userAdmin);
  }
  )

}

function clientCreate(full_name, email, phone_number, review_text, cb) {

  var client = new Client({ full_name: full_name, email: email, phone_number: phone_number, review_text: review_text });

  client.save(function (err) {
    if(err) { cb(err, null); return;}

    console.log('New Client: ' + client);

    clients.push(client);
    cb(null, client);
    } )
}

function clientReviewCreate(client, client_text, stars, cb) {

  var clientReview = new ClientReview({ client: client, review_text: client_text, stars: stars});

  clientReview.save(function (err) {
    if(err) {cb(err, null); return;}

    console.log('New Client Review: ' + clientReview);

    clientReviews.push(clientReview);
    cb(null, clientReview);
  });
}

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

function productCreate(name, price, ean_13, status, tags, features, description, category, image_file, reviewClient,  cb) {
  productdetail = { 
    name: name,
    price: price,
    ean_13: ean_13,
    status: status,
    tags: tags,
    features: features,
    description: description,
    category: category,
    image_file: image_file,
    review_client: reviewClient
  }

  if (category != false) productdetail.category = category
    
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
          categoryCreate("Electromenager", callback);
        },
        function(callback) {
          categoryCreate("Ventillateur", callback);
        },
        function(callback) {
          categoryCreate("TV", callback);
        },
        function(callback) {
          categoryCreate("Cuisine", callback);
        },
        function(callback) {
          imageCreate('images/products/'+'SB_IMG_'+Date.now()+ '_' +Math.round(Math.random() * 1E9)+'.jpg', callback)
        },
        function(callback) {
          clientCreate('Moussa Bah', 'moussa@gmail.com', 621803965, clientReviews[0], callback)
        },
        function(callback) {
          clientReviewCreate(clients[0],'funny mobile phone', 4, callback);
        },
        function (callback) {
          userAdminCreate('aslim','1234', callback);
        }
        ],
        // optional callback
        cb);
}


function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate('Samsung Galaxy J2','1100000', '806088223223', true ,'android, phone, samsung', {color: 'black'},'', categories[0], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("16 Wall Fall",'150000', '6933028742406', true ,'ventilateur, suspension', {color: 'white', model: 'WF-40C', voltage: '220V/50Hz', quantity: 2, net_weight: 3.5 },['3 speed setting, 3 type of wind', 'synchronus motor oscillation', 'Energy efficient', 'Reliable and durable fan copper motor', 'whisper quet operating', '30 degree vertical adjustement', '90 degree horizontal oscillation'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("Oscillation Stand Fan",'150000', '6905489139071', true ,'ventilateur, suspension', {color: 'blue / white', model: 'SABUS16271', voltage: '220V/50Hz', quantity: 4, net_weight: 7.3 },['3 speed setting, 3 type of wind', 'synchronus motor oscillation', 'Energy efficient', 'Reliable and durable fan copper motor', 'whisper quet operating', '30 degree vertical adjustement', '90 degree horizontal oscillation'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("12 Box Fan With Stand",'150000', '6933028742901', true ,'ventilateur, suspension', {color: 'white', model: 'KYT-303', voltage: '220V/50Hz', quantity: 2, net_weight: 2.8 },['Elegant Design', 'High Power Motor', '60 Minutes Timer', 'Up and Down Vertical Adjustable Function', 'Synchronus Motor Type', '30 degree vertical adjustement'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate('Samsung Galaxy J2','1100000', '806088223223', true ,'android, phone, samsung', {color: 'black'},'', categories[0], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("16 Wall Fall",'150000', '6933028742406', true ,'ventilateur, suspension', {color: 'white', model: 'WF-40C', voltage: '220V/50Hz', quantity: 2, net_weight: 3.5 },['3 speed setting, 3 type of wind', 'synchronus motor oscillation', 'Energy efficient', 'Reliable and durable fan copper motor', 'whisper quet operating', '30 degree vertical adjustement', '90 degree horizontal oscillation'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("Oscillation Stand Fan",'150000', '6905489139071', true ,'ventilateur, suspension', {color: 'blue / white', model: 'SABUS16271', voltage: '220V/50Hz', quantity: 4, net_weight: 7.3 },['3 speed setting, 3 type of wind', 'synchronus motor oscillation', 'Energy efficient', 'Reliable and durable fan copper motor', 'whisper quet operating', '30 degree vertical adjustement', '90 degree horizontal oscillation'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("12 Box Fan With Stand",'150000', '6933028742901', true ,'ventilateur, suspension', {color: 'white', model: 'KYT-303', voltage: '220V/50Hz', quantity: 2, net_weight: 2.8 },['Elegant Design', 'High Power Motor', '60 Minutes Timer', 'Up and Down Vertical Adjustable Function', 'Synchronus Motor Type', '30 degree vertical adjustement'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate('Samsung Galaxy J2','1100000', '806088223223', true ,'android, phone, samsung', {color: 'black'},'', categories[0], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("16 Wall Fall",'150000', '6933028742406', true ,'ventilateur, suspension', {color: 'white', model: 'WF-40C', voltage: '220V/50Hz', quantity: 2, net_weight: 3.5 },['3 speed setting, 3 type of wind', 'synchronus motor oscillation', 'Energy efficient', 'Reliable and durable fan copper motor', 'whisper quet operating', '30 degree vertical adjustement', '90 degree horizontal oscillation'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("Oscillation Stand Fan",'150000', '6905489139071', true ,'ventilateur, suspension', {color: 'blue / white', model: 'SABUS16271', voltage: '220V/50Hz', quantity: 4, net_weight: 7.3 },['3 speed setting, 3 type of wind', 'synchronus motor oscillation', 'Energy efficient', 'Reliable and durable fan copper motor', 'whisper quet operating', '30 degree vertical adjustement', '90 degree horizontal oscillation'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("12 Box Fan With Stand",'150000', '6933028742901', true ,'ventilateur, suspension', {color: 'white', model: 'KYT-303', voltage: '220V/50Hz', quantity: 2, net_weight: 2.8 },['Elegant Design', 'High Power Motor', '60 Minutes Timer', 'Up and Down Vertical Adjustable Function', 'Synchronus Motor Type', '30 degree vertical adjustement'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate('Samsung Galaxy J2','1100000', '806088223223', true ,'android, phone, samsung', {color: 'black'},'', categories[0], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("16 Wall Fall",'150000', '6933028742406', true ,'ventilateur, suspension', {color: 'white', model: 'WF-40C', voltage: '220V/50Hz', quantity: 2, net_weight: 3.5 },['3 speed setting, 3 type of wind', 'synchronus motor oscillation', 'Energy efficient', 'Reliable and durable fan copper motor', 'whisper quet operating', '30 degree vertical adjustement', '90 degree horizontal oscillation'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("Oscillation Stand Fan",'150000', '6905489139071', true ,'ventilateur, suspension', {color: 'blue / white', model: 'SABUS16271', voltage: '220V/50Hz', quantity: 4, net_weight: 7.3 },['3 speed setting, 3 type of wind', 'synchronus motor oscillation', 'Energy efficient', 'Reliable and durable fan copper motor', 'whisper quet operating', '30 degree vertical adjustement', '90 degree horizontal oscillation'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("12 Box Fan With Stand",'150000', '6933028742901', true ,'ventilateur, suspension', {color: 'white', model: 'KYT-303', voltage: '220V/50Hz', quantity: 2, net_weight: 2.8 },['Elegant Design', 'High Power Motor', '60 Minutes Timer', 'Up and Down Vertical Adjustable Function', 'Synchronus Motor Type', '30 degree vertical adjustement'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate('Samsung Galaxy J2','1100000', '806088223223', true ,'android, phone, samsung', {color: 'black'},'', categories[0], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("16 Wall Fall",'150000', '6933028742406', true ,'ventilateur, suspension', {color: 'white', model: 'WF-40C', voltage: '220V/50Hz', quantity: 2, net_weight: 3.5 },['3 speed setting, 3 type of wind', 'synchronus motor oscillation', 'Energy efficient', 'Reliable and durable fan copper motor', 'whisper quet operating', '30 degree vertical adjustement', '90 degree horizontal oscillation'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("Oscillation Stand Fan",'150000', '6905489139071', true ,'ventilateur, suspension', {color: 'blue / white', model: 'SABUS16271', voltage: '220V/50Hz', quantity: 4, net_weight: 7.3 },['3 speed setting, 3 type of wind', 'synchronus motor oscillation', 'Energy efficient', 'Reliable and durable fan copper motor', 'whisper quet operating', '30 degree vertical adjustement', '90 degree horizontal oscillation'], categories[1], images[0], clientReviews[0], callback);
        },
        function(callback) {
          productCreate("12 Box Fan With Stand",'150000', '6933028742901', true ,'ventilateur, suspension', {color: 'white', model: 'KYT-303', voltage: '220V/50Hz', quantity: 2, net_weight: 2.8 },['Elegant Design', 'High Power Motor', '60 Minutes Timer', 'Up and Down Vertical Adjustable Function', 'Synchronus Motor Type', '30 degree vertical adjustement'], categories[1], images[0], clientReviews[0], callback);
        },
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
        console.log('FINAL ERR: ' + err);
    }
    else {
        console.log('Produits: '+products);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



