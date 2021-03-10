var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CloudSchema = new Schema({
    name: {type:String, required: true},
    length: {type: Number, required: false},
    date: {type: Date, default: Date.now()},

    img: {
        data: {type: Buffer},
        contentType: {type: String}
    }
})

module.exports = mongoose.model('Cloud', CloudSchema);