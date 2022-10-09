import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RegistrationRequest = new Schema({
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
  profilePicture: {
    type: String,
  },
});

export default mongoose.model(
  'RegistrationRequest',
  RegistrationRequest,
  'registration_request'
);
