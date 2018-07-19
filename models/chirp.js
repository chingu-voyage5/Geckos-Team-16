const mongoose = require('mongoose');

//Schema Config
var chirpSchema = new mongoose.Schema({
    body: {
        type: String,
        minlength: 1,
        maxlength: 280
    },
    createdDate: {
        type: Date,
        default: Date.now
    }, 
    deleted: {
        type: Boolean, 
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    numLikes: {
        type: Number,
        default: 0
    },
    usersLiked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}); 

//Model Config
var Chirp = mongoose.model("Chirp", chirpSchema);

module.exports = Chirp;