var mongoose = require('mongoose');
const category = require('./category');
var { DateTime } = require('luxon');
var Category = require('./category')
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true},
    price: {type: String, required: false},
    ean_13: {type: Number, required: true},
    status: {type: Boolean, required: false, default: false},
    tags: {type: String, required: true},
    features: {type: Object, required: true},
    description: {type: Array, required: false},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    image_file: {type: Schema.Types.ObjectId, ref: 'Image', required: true},
    review_client: [{type: Schema.Types.ObjectId, ref: 'reviewClient', required: false}],
    date: {type: Date, default: Date.now()}
});

ProductSchema
.virtual('date_formatted')
.get(function() {
    return DateTime.fromJSDate(this.date).toFormat('dd - LLL - yyyy')
})

ProductSchema
.virtual('detail_url')
.get(function() {
    return '/admin/product/'+this._id +'/edit'
});

ProductSchema
.virtual('category_name')
.get(function () {
    return Category.findOne(this.category).exec(function (err, data) {
        if(err) throw err;
    });
})
module.exports = mongoose.model('Product', ProductSchema);
