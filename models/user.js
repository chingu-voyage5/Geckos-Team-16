const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

//Schema Config
var userSchema = new mongoose.Schema({
    email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true
   },
   joinedDate: {
       type: Date,
       default: Date.now
   },
   profileData: {
       birthdate: Date,
       location: String,
       website: String,
       firstLastName: String
   },
   deleted: {
       type: Boolean,
       default: 0   
   },
   chirps: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Chirp"
   }]
});

//Model Config
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User", userSchema);

module.exports = User;