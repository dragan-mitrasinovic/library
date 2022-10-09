import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('snav', { static: true }) sidenav: MatSidenav;
  private authSubsctiption: Subscription;
  public userType: string = '';
  public picture = 'http://localhost:4000/images/users/default';

  constructor(
    public router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const leftOverAccessLevel = localStorage.getItem('userAccessLevel');

    if (leftOverAccessLevel !== null) {
      this.userType = leftOverAccessLevel;
      this.picture = localStorage.getItem('profilePicture');
      return;
    }
    this.authSubsctiption = this.authService.getLoggedIn().subscribe(() => {
      const loggedInUsername = localStorage.getItem('loggedInUser');
      if (
        loggedInUsername === null ||
        loggedInUsername === '' ||
        loggedInUsername === 'guest'
      ) {
        this.userType = 'guest';
        this.picture = 'http://localhost:4000/images/users/default';
      } else {
        this.userService.getUser(loggedInUsername).subscribe((user: User) => {
          this.userType = user.type;
          this.picture = user.profilePicture;
          console.log(this.picture);
          localStorage.setItem('profilePicture', this.picture);
          localStorage.setItem('userAccessLevel', this.userType);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubsctiption.unsubscribe();
  }

  onLogout() {
    localStorage.clear();
    this.sidenav.close();
    this.router.navigate(['']);
  }
}
