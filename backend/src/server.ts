import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './router/user.router';
import bookRouter from './router/book.router';
import path from 'path';
import borrowRouter from './router/borrow.router';

const app = express();
app.use(cors());
app.use(express.json());
app.use('*/images', express.static(path.join('images')));

mongoose.connect('mongodb://localhost:27017/library2');
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('db connected');
});

const router = express.Router();
router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/borrows', borrowRouter);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
