import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  dailyBook: Book;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getDailyBook().subscribe((book: Book) => {
      this.dailyBook = book;
    });
  }
}
