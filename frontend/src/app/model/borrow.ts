export class Borrow {
  bookId: string;
  username: string;
  borrowedOn: Date;
  returnedOn: Date;
  active: boolean;

  title: string;
  authors: string[];
  genres: string[];
  publisher: string;
  releaseDate: number;
  language: string;
  coverPicture: string;
  numberOfCopies: number;
  timesBorrowed: number;
}
