import { Component, OnInit } from '@angular/core';
import { Borrow } from '../model/borrow';
import { Book } from '../model/book';
import { BorrowService } from '../service/borrow.service';
import { BookService } from '../service/book.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css'],
})
export class BorrowedBooksComponent implements OnInit {
  public borrows: Borrow[] = [];
  public books: Book[] = [];
  private username: string;

  constructor(
    private borrowService: BorrowService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('loggedInUser');
    this.updateList();
  }

  remainingDays(book: Book) {
    var ret: string;
    var dayDiff: number =
      14 -
      Math.ceil(
        (new Date().getTime() - new Date(book.borrowedOn).getTime()) /
          (1000 * 3600 * 24)
      );
    if (dayDiff > 0) {
      ret = 'Days remaining: ' + dayDiff.toString();
    } else {
      dayDiff *= -1;
      ret = 'Days late: ' + dayDiff.toString();
    }
    return ret;
  }

  onReturn(book: Book) {
    this.borrowService.returnBook(this.username, book._id).subscribe((resp) => {
      this.updateList();
    });
  }

  updateList() {
    this.books = [];
    this.borrowService
      .getAllActiveBorrows(this.username)
      .subscribe((brs: Borrow[]) => {
        this.borrows = brs;
        for (var b of this.borrows) {
          this.bookService.getBook(b.bookId).subscribe((resp: Book) => {
            resp.borrowedOn = b.borrowedOn;
            this.books.push(resp);
          });
        }
      });
  }
}
