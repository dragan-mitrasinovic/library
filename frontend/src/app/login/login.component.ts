import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  topBooks: Book[];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.bookService.getTopBooks().subscribe((books: Book[]) => {
      this.topBooks = books;
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.userService
      .login(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      )
      .subscribe(
        (response) => {
          if (response != null) {
            localStorage.setItem(
              'loggedInUser',
              this.loginForm.get('username').value
            );
            this.authService.logIn();
            this.router.navigate(['home-page']);
          }
        },
        (error) => {
          this.snackbar.open('Invalid credentials!', 'Close', {
            duration: 2500,
          });
        }
      );
  }

  onGuestLogin() {
    localStorage.setItem('loggedInUser', 'guest');
    this.authService.logIn();
    this.router.navigate(['home-page']);
  }
}
