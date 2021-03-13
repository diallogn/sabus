var mongoose = require('mongoose');
var { DateTime } = require('luxon');
var Schema = mongoose.Schema;

CommandtSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: false},
    address: {type: String, required: true},
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    date: {type: Date, default: Date.now()},
});

CommandtSchema 
.virtual('date_formatted')
.get(function() {
    return DateTime.fromJSDate(this.date).toFormat('dd - LLL - yyyy')
})
module.exports = mongoose.model('Command', CommandtSchema);