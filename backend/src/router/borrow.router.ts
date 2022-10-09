import express from 'express';
import { BorrowController } from '../controller/borrow.controller';

const borrowRouter = express.Router();

borrowRouter
  .route('/active/:username')
  .get((req, res) => new BorrowController().getAllActiveBorrows(req, res));

borrowRouter
  .route('/all/:username')
  .get((req, res) => new BorrowController().getAllBorrows(req, res));

borrowRouter
  .route('/return')
  .post((req, res) => new BorrowController().returnBook(req, res));

borrowRouter
  .route('')
  .post((req, res) => new BorrowController().borrowBook(req, res));

export default borrowRouter;
