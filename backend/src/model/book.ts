import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Book = new Schema({
  _id: {
    type: ObjectId,
  },
  title: {
    type: String,
  },
  authors: {
    type: Array,
  },
  genres: {
    type: Array,
  },
  publisher: {
    type: String,
  },
  releaseDate: {
    type: String,
  },
  language: {
    type: String,
  },
  coverPicture: {
    type: String,
  },
  numberOfCopies: {
    type: Number,
  },
  timesBorrowed: {
    type: Number,
  },
  comments: {
    type: Array,
  },
  rating: {
    type: Number,
  },
});

export default mongoose.model('Book', Book, 'book');
