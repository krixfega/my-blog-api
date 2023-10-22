const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { 
    type: String, 
    default: 'user' }, // Default role is "user"
  // Additional fields as needed (e.g., name, role)
});

const User = mongoose.model('User', userSchema);

module.exports = User;
