const mongoose = require('mongoose');
const {Schema} = mongoose;


//Model for the attributes in a User-Object
const UserSchema = new Schema({
    username: {type: String},
    hash: {type: String},
    salt: {type: String},
    ratings: {Array{ObjectID}}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
