import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:5000';

  private endpoints = {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
  };

  constructor(private http: HttpClient) {}

  login$(email: string, password: string): Observable<IUser | null> {
    return this.http.post<IUser>(
      `${this.baseUrl}${this.endpoints.login}`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  register$(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    photoURL: string
  ): Observable<IUser> {
    return this.http.post<IUser>(
      `${this.baseUrl}${this.endpoints.login}`,
      { email, password, firstName, lastName, photoURL },
      { withCredentials: true }
    );
  }

  logout$(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}${this.endpoints.logout}`,
      {},
      { withCredentials: true }
    );
  }
}
