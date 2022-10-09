import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BorrowService {
  private uri = 'http://localhost:4000/borrows';
  constructor(private http: HttpClient) {}

  getAllActiveBorrows(username: string) {
    return this.http.get(`${this.uri}/active/${username}`);
  }

  getAllBorrows(username: string) {
    return this.http.get(`${this.uri}/all/${username}`);
  }

  returnBook(username: string, bookId: string) {
    const data = {
      username,
      bookId,
    };
    return this.http.post(`${this.uri}/return`, data);
  }

  borrowBook(username: string, bookId: string) {
    const data = {
      username,
      bookId,
    };
    return this.http.post(`${this.uri}`, data);
  }
}
