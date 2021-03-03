var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {DateTime} = require('luxon')
var bcrypt = require('bcryptjs');

User_adminSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});

User_adminSchema
.virtual('date_formatted')
.get(function() {
    return DateTime.fromJSDate(this.date).toFormat('dd / LLL / yyyy')
});

let User = module.exports = mongoose.model('UserAdmin', User_adminSchema);

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback)
        })
    })
}

module.exports.getUserByEmail = function(email, callback) {
    User.findOne({email: email}, callback)
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
}

module.exports.comparePassword = function(candiatePassword, hash, callback) {
    
    bcrypt.compare(candiatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch)
    })
}