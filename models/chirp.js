const mongoose = require('mongoose');

//Schema Config
var chirpSchema = new mongoose.Schema({
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    //emoji: ?
    //photo: ?
}); 

//Model Config
var Chirp = mongoose.model("Chirp", chirpSchema);

module.exports = Chirp;