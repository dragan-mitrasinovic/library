import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  allBooks: Book[];
  filteredBooks: Book[] = [];
  search: string;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((books: Book[]) => {
      this.allBooks = books;
      this.filteredBooks = books;
    });
  }

  onSearch() {
    if (this.search === '') {
      this.filteredBooks = this.allBooks;
    }
    this.filteredBooks = this.allBooks.filter((book) =>
      this.containsSearch(book)
    );
  }

  containsSearch(book: Book): boolean {
    var authorMatch: boolean = false;
    for (var author of book.authors) {
      if (author.toLowerCase().startsWith(this.search.toLowerCase())) {
        authorMatch = true;
        break;
      }
    }
    return (
      book.title.toLowerCase().startsWith(this.search.toLowerCase()) ||
      authorMatch
    );
  }
}
