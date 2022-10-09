import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  userRequests: User[];
  displayedColumns: string[] = ['username', 'email', 'action'];
  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.updateData();
  }

  onAccept(username: string) {
    this.userService.acceptRegistrationInvite(username).subscribe((resp) => {
      this.updateData();
      this.snackbar.open('Successfully accepted the request!', 'Close', {
        duration: 2500,
      });
    });
  }

  onDecline(username: string) {
    this.userService.declineRegistrationInvite(username).subscribe((resp) => {
      this.updateData();
      this.snackbar.open('Successfully declined the request!', 'Close', {
        duration: 2500,
      });
    });
  }

  updateData() {
    this.userService
      .getAllRegistrationInvites()
      .subscribe((requests: User[]) => {
        this.userRequests = requests;
      });
  }
}
