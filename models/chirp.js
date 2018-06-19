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
    }

    //comment: 
        //1. create comment button in chirp.ejs 
        //2. create comment schema in comment.js
        //3. write Comment.create callback inside Chirp.create in routes.js
        //4. embed comment below to chirpSchema
        
//         comment: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Comment"
//             } 
//         ]

    //reChirp: ? 
    //embedPhoto: ?
    //embedVideo: ?
}); 

//Model Config
var Chirp = mongoose.model("Chirp", chirpSchema);

module.exports = Chirp;