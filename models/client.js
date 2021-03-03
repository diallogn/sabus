var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ClientSchema = new Schema({
    full_name: {type: String, required: true},
    email: {type: String, required: true},
    phone_number: {type: Number, required: true},
    client_review: {type: Schema.Types.ObjectId, ref: 'clientReview', required: false},
    date: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Client', ClientSchema);