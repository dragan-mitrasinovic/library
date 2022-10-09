import multer from 'multer';
import express from 'express';
import { BookController } from '../controller/book.controller';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/books');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const bookRouter = express.Router();

bookRouter
  .route('/:_id')
  .get((req, res) => new BookController().getBook(req, res));

bookRouter
  .route('')
  .get((req, res) => new BookController().getAllBooks(req, res));

bookRouter
  .route('/top/books')
  .get((req, res) => new BookController().getTopBooks(req, res));

bookRouter
  .route('/daily/book')
  .get((req, res) => new BookController().getDailyBook(req, res));

bookRouter.route('').post((req, res) => new BookController().addBook(req, res));

bookRouter
  .route('/comment')
  .post((req, res) => new BookController().addComment(req, res));

export default bookRouter;
