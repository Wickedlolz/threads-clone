import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private endpoints = {
    threads: '/api/threads',
  };

  constructor(private http: HttpClient) {}

  getThreads$(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.endpoints.threads}`);
  }
}
