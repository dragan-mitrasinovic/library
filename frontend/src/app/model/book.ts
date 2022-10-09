import { BookComment } from './comment';

export class Book {
  _id: string;
  title: string;
  authors: string[];
  genres: string[];
  publisher: string;
  releaseDate: number;
  language: string;
  coverPicture: string;
  numberOfCopies: number;
  timesBorrowed: number;
  borrowedOn: Date;
  rating: number;
  comments: BookComment[];
}
