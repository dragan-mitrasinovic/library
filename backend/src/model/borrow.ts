import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Borrow = new Schema({
  bookId: {
    type: ObjectId,
  },
  username: {
    type: String,
  },
  borrowedOn: {
    type: Date,
  },
  returnedOn: {
    type: Date,
  },
  active: {
    type: Boolean,
  },
});

export default mongoose.model('Borrow', Borrow, 'borrow');
