import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.adminLoginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onAdminLogin() {
    if (this.adminLoginForm.invalid) {
      return;
    }

    this.userService
      .adminLogin(
        this.adminLoginForm.get('username').value,
        this.adminLoginForm.get('password').value
      )
      .subscribe(
        (response) => {
          if (response != null) {
            localStorage.setItem(
              'loggedInUser',
              this.adminLoginForm.get('username').value
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
}
