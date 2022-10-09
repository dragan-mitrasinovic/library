import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const data = {
      username,
      password,
    };
    return this.http.post(`${this.uri}/login`, data);
  }

  adminLogin(username: string, password: string) {
    const data = {
      username,
      password,
    };
    return this.http.post(`${this.uri}/admin-login`, data);
  }

  register(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    email: string,
    image: File
  ) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    if (image !== null) {
      formData.append('image', image, username);
      formData.append('containsImage', 'true');
    } else {
      formData.append('containsImage', 'false');
    }
    return this.http.post(`${this.uri}/register`, formData);
  }

  getUser(username: string) {
    return this.http.get(`${this.uri}/${username}`);
  }

  changePassword(username: string, oldPassword: string, newPassword: string) {
    const data = {
      oldPassword,
      newPassword,
    };
    return this.http.post(`${this.uri}/change-password/${username}`, data);
  }

  acceptRegistrationInvite(username: string) {
    const data = {
      username,
    };
    return this.http.post(`${this.uri}/accept`, data);
  }

  declineRegistrationInvite(username: string) {
    const data = {
      username,
    };
    return this.http.post(`${this.uri}/decline`, data);
  }

  getAllRegistrationInvites() {
    return this.http.get(`${this.uri}/requests/all`);
  }
}
