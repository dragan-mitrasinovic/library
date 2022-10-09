import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../CustomValidators';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { imageType } from '../image-type-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@^!%&*?])[A-Za-z\d#$@!%&*^?]{8,12}$/;
  imagePreview;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-z]/),
          Validators.pattern(this.passwordRegex),
        ]),
        confirmPassword: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        image: new FormControl(null, {
          /*asyncValidators: [imageType]*/
        }),
      },
      CustomValidators.mustMatch('password', 'confirmPassword')
    );
  }

  onRegister() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.userService
      .register(
        this.registrationForm.get('username').value,
        this.registrationForm.get('password').value,
        this.registrationForm.get('firstName').value,
        this.registrationForm.get('lastName').value,
        this.registrationForm.get('address').value,
        this.registrationForm.get('phoneNumber').value,
        this.registrationForm.get('email').value,
        this.registrationForm.get('image').value
      )
      .subscribe(
        () => {
          let snackbarRef = this.snackbar.open(
            'Successfully registered!',
            'Close',
            {
              duration: 2500,
            }
          );
          snackbarRef.afterDismissed().subscribe(() => {
            this.router.navigate(['']);
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

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.registrationForm.patchValue({ image: file });
    this.registrationForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
