var mongoose = require('mongoose');
var Schema = mongoose.Schema;

Review_clientSchema = new Schema({
    client: {type: Schema.Types.ObjectId, required: true},
    review_text: {type: String, required: false},
    stars: {type: Number, maxLength: 5, required: false},
    date: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('ReviewClient', Review_clientSchema);