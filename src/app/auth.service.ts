import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://pedago.univ-avignon.fr:3227/login';

  constructor(private http: HttpClient) {}

  login(login: string, password: string ): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?login=${login}&password=${password}`, {});
  }
  

  logout(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/logout`, {});
  }
}