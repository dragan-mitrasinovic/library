import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../CustomValidators';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  passwordChangeForm: FormGroup;
  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@^!%&*?])[A-Za-z\d#$@!%&*^?]{8,12}$/;

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passwordChangeForm = new FormGroup(
      {
        oldPassword: new FormControl('', Validators.required),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-z]/),
          Validators.pattern(this.passwordRegex),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      CustomValidators.mustMatch('newPassword ', 'confirmPassword')
    );
  }

  onConfirmChange() {
    this.userService
      .changePassword(
        localStorage.getItem('loggedInUser'),
        this.passwordChangeForm.get('oldPassword').value,
        this.passwordChangeForm.get('newPassword').value
      )
      .subscribe(
        (resp) => {
          let snackBarRef = this.snackbar.open(resp['message'], 'Close', {
            duration: 2500,
          });
          snackBarRef.afterDismissed().subscribe(() => {
            localStorage.clear();
            this.router.navigate(['']);
          });
        },
        (error) => {
          this.passwordChangeForm.reset();
          let snackBarRef = this.snackbar.open('Wrong password', 'Close', {
            duration: 2500,
          });
        }
      );
  }
}
