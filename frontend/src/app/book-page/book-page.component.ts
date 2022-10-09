import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../model/book';
import { BookComment } from '../model/comment';
import { BookService } from '../service/book.service';
import { BorrowService } from '../service/borrow.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit {
  public currentBook: Book;
  comments: BookComment[];
  ratings: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  myCommentText: string;
  myCommentRating: number;
  guest: boolean;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private borrowService: BorrowService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let username = localStorage.getItem('loggedInUser');
    if (username === 'guest') {
      this.guest = true;
    } else {
      this.guest = false;
    }
    this.updateData();
  }

  onBorrow() {
    let username = localStorage.getItem('loggedInUser');
    this.borrowService.borrowBook(username, this.currentBook._id).subscribe(
      () => {
        this.updateData();
        this.snackbar.open('Successfully borrowed the book!', 'Close', {
          duration: 2500,
        });
      },
      (err) => {
        console.log(err);
        this.snackbar.open(err.error['message'], 'Close', {
          duration: 2500,
        });
      }
    );
  }

  updateData() {
    const bookId = this.route.snapshot.paramMap.get('bookId');
    this.bookService.getBook(bookId).subscribe((book: Book) => {
      this.currentBook = book;
      this.comments = book.comments;
    });
  }

  onComment() {
    const username = localStorage.getItem('loggedInUser');
    this.bookService
      .comment(
        username,
        this.currentBook._id,
        this.myCommentRating,
        this.myCommentText
      )
      .subscribe(
        () => {
          this.updateData();
          let snackbarRef = this.snackbar.open(
            'Successfully commented!',
            'Close',
            {
              duration: 1500,
            }
          );
          snackbarRef.afterDismissed().subscribe(() => {
            this.myCommentText = '';
            this.myCommentRating = null;
          });
        },
        (error) => {
          console.log(error);
          this.snackbar.open(error.error['message'], 'Close', {
            duration: 2500,
          });
        }
      );
  }
}
