const mongoose = require('mongoose');

//Schema Config
var userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    joinedDate: Date,
    birthday: Date,
    location: String,
    website: String,
    displayName: String
    //numChirps
}); 

//Model Config
var User = mongoose.model("User", userSchema);

module.exports = User;