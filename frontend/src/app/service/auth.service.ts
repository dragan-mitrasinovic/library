import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedIn = new Subject<boolean>();

  constructor() {}

  logIn(): void {
    this.userLoggedIn.next(true);
  }

  getLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }
}
