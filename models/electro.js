var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ElectroSchema = new Schema({
    name: {type: String, required: true, maxlength: 100},
    reference: {type: String, required: true},
    family: {type: String, required: true},
    description: {type: String, required: false},
    image_url: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

ElectroSchema
.virtual('url')
.get(function(){
    return '/nos-produits/electromenager/'+this._id
})

module.exports = mongoose.model('Electro', ElectroSchema);