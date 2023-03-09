const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:String,
  name:String,
  hashedPassword:String,
});

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