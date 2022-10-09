import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DailyBook = new Schema({
  bookId: {
    type: ObjectId,
  },
  day: {
    type: Date,
  },
});

export default mongoose.model('DailyBook', DailyBook, 'daily-book');
