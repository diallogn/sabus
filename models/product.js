var mongoose = require('mongoose');
var { DateTime }= require('luxon');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true, maxlength: 100},
    price: {type: Number, required: false},
    ean_13: {type: Number, required: false},
    status: {type: Boolean, required: true , default: false},
    tags: {type: String, required: true},
    features: [{type: Object, required: false}],
    categories: [{type: Schema.Types.ObjectId, ref: 'Category', required: true}],
    description: {type: String, required: false},
    image_file: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

ProductSchema
.virtual('url')
.get(function(){
    return '/product/' + this._id
});


ProductSchema
.virtual('date_formatted')
.get(function(){
    return DateTime.fromJSDate(this.date).toFormat('dd / LLL / yyyy')
});

module.exports = mongoose.model('Product', ProductSchema);