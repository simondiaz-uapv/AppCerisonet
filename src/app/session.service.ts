import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'https://pedago.univ-avignon.fr:3227';
  private sessionActiveSubject = new BehaviorSubject<boolean>(false);
  sessionActive$ = this.sessionActiveSubject.asObservable();

  constructor(private http: HttpClient) {}

  isSessionActive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/checkSession`).pipe(
      tap(response => this.sessionActiveSubject.next(response.isActive))
    );
  }

  setSessionActive(isActive: boolean): void {
    this.sessionActiveSubject.next(isActive);
  }

  isSessionActiveFonction(): boolean {
    let isActive = false;
    this.http.get<any>(`${this.apiUrl}/checkSession`).pipe(
      tap(response => {
        isActive = response.isActive;
        this.sessionActiveSubject.next(isActive);
      })
    ).subscribe();
    return isActive;
  }
}