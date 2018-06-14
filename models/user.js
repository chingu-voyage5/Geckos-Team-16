const mongoose = require('mongoose');

//Schema Config
var userSchema = new mongoose.Schema({
   email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true,
   },
   username: {
       type: String,
       required: true,
       unique: true,
       minlength: 3,
       maxlength: 12,
       trim: true
   },
   password: {
       type: String,
       required: true,
       trim: true,
       minlength: 5        
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
       type: boolean,    
   }
   //numChirps: {
       //find object and function syntax to count chirp
   //}
});

//Model Config
var User = mongoose.model("User", userSchema);

module.exports = User;