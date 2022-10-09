import express from 'express';
import Book from '../model/book';
import { ObjectId } from 'mongodb';
import DailyBook from '../model/daily-book';
import Borrow from '../model/borrow';

export class BookController {
  public getBook = (req: express.Request, res: express.Response) => {
    const _id = new ObjectId(req.params._id);
    Book.findById(_id, (err, book) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json(book);
    });
  };

  public addComment = (req: express.Request, res: express.Response) => {
    const _id = new ObjectId(req.body._id);
    const username = req.body.username;
    Book.findById(_id, (err, book) => {
      if (err) {
        console.log(err);
        return;
      }
      let alreadyCommented = false;
      for (const comment of book.comments) {
        if (comment.username === username) {
          alreadyCommented = true;
          break;
        }
      }
      if (alreadyCommented) {
        res
          .status(409)
          .json({ message: 'You already commented on this book!' });
        return;
      }
      Borrow.findOne({ username, bookId: _id }, (er, borrow) => {
        if (er) {
          console.log(er);
          return;
        }
        if (borrow === null) {
          res.status(409).json({ message: 'You never borrowed this book!' });
          return;
        }
        book.rating =
          (book.rating * book.comments.length + req.body.rating) /
          (book.comments.length + 1);
        var comment = {
          rating: req.body.rating,
          text: req.body.text,
          date: new Date(),
          username,
        };
        book.comments.push(comment);
        book.save().then(() => {
          res.status(200).json({ message: 'Success!' });
        });
      });
    });
  };

  public getAllBooks = (req: express.Request, res: express.Response) => {
    Book.find({}, (err, books) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json(books);
    });
  };

  public addBook = (req: express.Request, res: express.Response) => {
    const newBook = new Book({
      _id: new ObjectId(),
      title: req.body.title,
      authors: req.body.authors,
      genres: req.body.genres,
      publisher: req.body.publisher,
      releaseDate: req.body.releaseDate,
      language: req.body.language,
      coverPicture: req.body.coverPicture,
      numberOfCopies: req.body.numberOfCopies,
      comments: [],
      rating: 0,
      timesBorrowed: 0,
    });
    newBook.save().then(() => {
      res.status(200).json({ message: 'Success' });
    });
  };

  public getTopBooks = (req: express.Request, res: express.Response) => {
    Book.find({}, (err, resp) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(resp);
    })
      .sort({ timesBorrowed: -1 })
      .limit(3);
  };

  public getDailyBook = (req: express.Request, res: express.Response) => {
    let currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    DailyBook.findOne({ day: currentDate }, (e, daily) => {
      if (e) {
        console.log(e);
        return;
      }
      if (daily !== null) {
        const _id = daily.bookId;
        Book.findById(_id, (er, bk) => {
          if (er) {
            console.log(er);
            return;
          }
          res.json(bk);
        });
      } else {
        Book.aggregate([{ $sample: { size: 1 } }], (err, books) => {
          if (err) {
            console.log(err);
            return;
          }
          const newDaily = new DailyBook({
            bookId: books[0]._id,
            day: currentDate,
          });
          const _id = books[0]._id;
          newDaily.save().then(() => {
            Book.findById(_id, (error, book) => {
              if (error) {
                console.log(error);
                return;
              }
              res.json(book);
            });
          });
        });
      }
    });
  };
}
