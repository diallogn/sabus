var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {DateTime} = require('luxon');

CategorySchema = new Schema({
    name: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});

CategorySchema
.virtual('date_formatted')
.get(function () {
    return DateTime.fromJSDate(this.date).toFormat('dd - LLL - yyyy');
});

module.exports = mongoose.model('Category', CategorySchema);