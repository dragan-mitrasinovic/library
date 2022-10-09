import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  type: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  booksBorrowed: {
    type: Number,
  },
});

export default mongoose.model('User', User, 'user');
