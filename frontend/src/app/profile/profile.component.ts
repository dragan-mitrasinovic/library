import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../CustomValidators';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUser(localStorage.getItem('loggedInUser'))
      .subscribe((user: User) => {
        this.currentUser = user;
        this.profileForm = new FormGroup({
          username: new FormControl(user.username, Validators.required),
          firstName: new FormControl(user.firstName, Validators.required),
          lastName: new FormControl(user.lastName, Validators.required),
          address: new FormControl(user.address, Validators.required),
          phoneNumber: new FormControl(user.phoneNumber, Validators.required),
          email: new FormControl(user.email, [
            Validators.required,
            Validators.email,
          ]),
        });
      });
  }

  onConfirmChange() {}
}
