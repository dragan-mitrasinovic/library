import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private uri = 'http://localhost:4000/books';

  constructor(private http: HttpClient) {}

  getBook(_id: string) {
    return this.http.get(`${this.uri}/${_id}`);
  }

  getAllBooks() {
    return this.http.get(`${this.uri}`);
  }

  getTopBooks() {
    return this.http.get(`${this.uri}/top/books`);
  }

  getDailyBook() {
    return this.http.get(`${this.uri}/daily/book`);
  }

  comment(username: string, _id: string, rating: number, text: string) {
    const data = {
      username,
      _id,
      rating,
      text,
    };
    return this.http.post(`${this.uri}/comment`, data);
  }
}
