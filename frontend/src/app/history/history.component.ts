import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Book } from '../model/book';
import { Borrow } from '../model/borrow';
import { BookService } from '../service/book.service';
import { BorrowService } from '../service/borrow.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  borrows: Borrow[];
  displayedColumns: string[] = [
    'title',
    'authors',
    'borrowedOn',
    'returnedOn',
    'details',
  ];

  constructor(
    private borrowService: BorrowService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    let username = localStorage.getItem('loggedInUser');
    this.borrowService.getAllBorrows(username).subscribe((borr: Borrow[]) => {
      this.borrows = borr;
      this.borrows.forEach((borrow) => {
        this.bookService.getBook(borrow.bookId).subscribe((book: Book) => {
          borrow.title = book.title;
          borrow.authors = book.authors;
        });
      });
    });
  }

  sortData(sort: Sort) {
    const data = this.borrows.slice();
    if (!sort.active || sort.direction === '') {
      this.borrows = data;
      return;
    }

    this.borrows = data.sort((a: Borrow, b: Borrow) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'authors':
          return compare(a.authors[0], b.authors[0], isAsc);
        case 'borrowedOn':
          return compareDate(a.borrowedOn, b.borrowedOn, isAsc);
        case 'returnedOn':
          return compareDate(a.returnedOn, b.returnedOn, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDate(a: Date, b: Date, isAsc: boolean) {
  return (
    (new Date(a).getTime() < new Date(b).getTime() ? -1 : 1) * (isAsc ? 1 : -1)
  );
}
