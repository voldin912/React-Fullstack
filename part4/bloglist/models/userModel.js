const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    minLength: 3,
    required:true,
    unique:true
  },
  name:String,
  hashedPassword: {
    type:String,
    required:true
  }
});
userSchema.plugin(uniqueValidator,  { message: 'Error, expected {PATH} to be unique.' });
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.hashedPassword;
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;