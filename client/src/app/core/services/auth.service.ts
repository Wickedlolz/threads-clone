import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoints = {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
  };

  constructor(private http: HttpClient) {}

  login$(email: string, password: string): Observable<IUser | null> {
    return this.http.post<IUser>(
      `${environment.apiUrl}${this.endpoints.login}`,
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
      `${environment.apiUrl}${this.endpoints.login}`,
      { email, password, firstName, lastName, photoURL },
      { withCredentials: true }
    );
  }

  logout$(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${environment.apiUrl}${this.endpoints.logout}`,
      {},
      { withCredentials: true }
    );
  }
}
