import express from 'express';
import Borrow from '../model/borrow';
import Book from '../model/book';
import User from '../model/user';
import { ObjectId } from 'mongodb';
import { UserController } from './user.controller';

export class BorrowController {
  public getAllActiveBorrows = (
    req: express.Request,
    res: express.Response
  ) => {
    const username = req.params.username;
    Borrow.find({ username, active: true }, (err, resp) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(resp);
    });
  };

  public getAllBorrows = (req: express.Request, res: express.Response) => {
    const username = req.params.username;
    Borrow.find({ username }, (err, resp) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(resp);
    }).sort({ returnedOn: -1 });
  };

  public borrowBook = (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    const _id = new ObjectId(req.body.bookId);
    User.findOne({ username }, (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      if (user.booksBorrowed >= 3) {
        res.status(409).json({ message: 'You already borrowed 3 books!' });
        return;
      }
      Book.findById(_id, (er, book) => {
        if (er) {
          console.log(er);
          return;
        }
        Borrow.findOne(
          { username, bookId: _id, active: true },
          (error, borrow) => {
            if (error) {
              console.log(error);
              return;
            }
            if (borrow != null) {
              res
                .status(409)
                .json({ message: 'You already borrowed this book!' });
              return;
            }

            user.booksBorrowed++;
            user.save().then(() => {
              book.numberOfCopies--;
              book.timesBorrowed++;
              book.save().then(() => {
                const borrow = new Borrow({
                  bookId: _id,
                  username,
                  borrowedOn: new Date(),
                  returnedOn: null,
                  active: true,
                });
                borrow.save().then(() => {
                  res.status(200).json({ message: 'Success' });
                });
              });
            });
          }
        );
      });
    });
  };

  public returnBook = (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    const _id = new ObjectId(req.body.bookId);
    const date = new Date();
    Borrow.updateOne(
      { username, bookId: _id },
      { $set: { active: false, returnedOn: date } },
      (err, resp) => {
        if (err) {
          console.log(err);
          return;
        }
        Book.updateOne(
          { _id },
          { $inc: { numberOfCopies: 1 } },
          (error, book) => {
            if (error) {
              console.log(error);
              return;
            }
            User.updateOne(
              { username },
              { $inc: { booksBorrowed: -1 } },
              (er, response) => {
                if (er) {
                  console.log(er);
                  return;
                } else {
                  res.json(response);
                }
              }
            );
          }
        );
      }
    );
  };
}
